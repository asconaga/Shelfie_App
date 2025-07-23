import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// are we running in a browser?
const isWeb = true; // Platform.OS === 'web';

let dbPromise = null;
if (!isWeb) {
    // const SQLite = require('expo-sqlite');
    // dbPromise = SQLite.openDatabaseAsync('shelfie.db');
}

// AsyncStorage “table” key
const STORAGE_KEY = 'shelfie_cards';

// ensure we have 100 cards seeded in AsyncStorage
async function ensureWebCards() {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw === null) {
        const cards = Array.from({ length: 100 }, (_, i) => ({
            id: i + 1,
            selected: 0,
        }));
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
        return cards;
    }
    return JSON.parse(raw);
}


export async function initDatabase() {
    if (isWeb) {
        await ensureWebCards();
        return;
    }

    const db = await dbPromise;

    // try {
    //     await db.execAsync(`DROP TABLE IF EXISTS settings;`);
    //     console.log('Dropped table `items` (if it existed).');
    // } catch (error) {
    //     console.error('Error dropping table `settings`', error);
    //     throw error;
    // }

    try {
        // Create new table with one boolean field (0/1)
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, selected INTEGER NOT NULL DEFAULT 0);`);

        // 2️⃣ Check row count
        const { count } = await db.getFirstAsync(`SELECT COUNT(*) AS count FROM cards;`);

        // 4️⃣ If empty, seed 100 rows all false (0)
        if (count === 0) {
            const stmt = await db.prepareAsync(`INSERT INTO cards (selected) VALUES (?);`);
            try {
                for (let i = 0; i < 100; i++) {
                    await stmt.executeAsync([0]);
                }
                console.log('Seeded 100 rows with selected = false');
            } finally {
                await stmt.finalizeAsync();
            }
        }
    } catch (error) {
        console.error('initDatabase error', error);
        throw error;
    }
}

// toggle one row
export async function setSelected(id, newVal) {
    if (isWeb) {
        const cards = await ensureWebCards();
        const idx = cards.findIndex((c) => c.id === id);
        if (idx < 0)
            throw new Error(`No card with id ${id}`);
        cards[idx].selected = newVal;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
        return { success: true };
    }

    const db = await dbPromise;
    const sql = `UPDATE cards SET selected = ? WHERE id = ?;`;
    const params = [newVal, id];

    return db.runAsync(sql, params);
}

/**
 * Fetch all items from the `items` table.
 * @returns {Promise<Array<{ id: number; name: string; value: string }>>}
 */
export async function fetchItems() {
    if (isWeb) {
        return ensureWebCards();
    }

    const db = await dbPromise;
    return db.getAllAsync(`SELECT * FROM cards;`);
}

// If you need direct access elsewhere:
export default dbPromise;

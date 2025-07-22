import * as SQLite from 'expo-sqlite';

// Open (or create) the database; this returns a Promise<SQLiteDatabase>
const dbPromise = SQLite.openDatabaseAsync('shelfie.db');

export async function initDatabase() {
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
export async function setSelected(index, newVal) {
    const db = await dbPromise;
    const sql = `UPDATE cards SET selected = ? WHERE id = ?;`;
    const params = [newVal, index];

    console.log('[SQL ▶]', sql, params);
    try {
        const result = await db.runAsync(sql, params);
        console.log('[SQL ✔]', result);
        return result;
    } catch (error) {
        console.error('[SQL ✖]', error);
        throw error;   // or handle it however you like
    }
}

/**
 * Fetch all items from the `items` table.
 * @returns {Promise<Array<{ id: number; name: string; value: string }>>}
 */
export async function fetchItems() {
    const db = await dbPromise;
    try {
        const rows = await db.getAllAsync(`SELECT * FROM cards;`);
        return rows;
    } catch (error) {
        console.error('Error fetching items', error);
        throw error;
    }
}

// If you need direct access elsewhere:
export default dbPromise;

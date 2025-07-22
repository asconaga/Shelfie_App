import { FlatList, StyleSheet, Text, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardWidget from '../components/cardWidget'
import { useEffect, useState } from 'react';
import { useTheme } from '../components/theme';
import { fetchItems, initDatabase, setSelected } from '../components/database';

const Books = () => {
    const t = useTheme();
    const widgets = Array.from({ length: 100 }, (_, i) => ({ id: String(i), index: i }));
    const [numColumns, setNumColumns] = useState(2);
    const { width: windowWidth } = useWindowDimensions();
    const [items, setItems] = useState([]);

    useEffect(() => {
        initDatabase();
        async function loadItems() {
            try {
                const rows = await fetchItems();        // 👉 fetchItems returns Promise<[{id, name, value}, …]>
                setItems(rows);
                // console.log(rows);                  // save into state
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        loadItems();
    }, []);


    const refreshItems = () => {
        fetchItems(
            rows => setItems(rows),
            error => console.error(error)
        );
    };

    // 2. Define your “ideal” widget width + gutter
    const idealWidgetWidth = 180;

    const handleToggle = async (id, selectedVal) => {
        console.log(id);

        let newVal = (selectedVal === 0) ? 1 : 0

        // // 1. update DB
        await setSelected(id, newVal);
        // // 2. optimistically update local state
        setItems((prev) =>
            prev.map((it) =>
                it.id === id ? { ...it, selected: newVal } : it
            )
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.background }]}
            onLayout={event => {
                const { width, height } = event.nativeEvent.layout;
                const newNumColumns = Math.max(
                    1,
                    Math.floor(windowWidth / (idealWidgetWidth))
                );

                console.log(newNumColumns);
                setNumColumns(newNumColumns);
            }}
        >
            <FlatList
                key={`flatlist-${numColumns}`}
                data={items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CardWidget
                        id={item.id}
                        selected={item.selected}
                        onPress={() => handleToggle(item.id, item.selected)} />
                )}
                numColumns={numColumns}                // for a grid with 3 columns
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default Books

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
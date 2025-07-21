import { FlatList, StyleSheet, Text, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardWidget from '../components/cardWidget'
import { useState } from 'react';
import { useTheme } from '../components/theme';

const Books = () => {
    const t = useTheme();
    const widgets = Array.from({ length: 100 }, (_, i) => ({ id: String(i), index: i }));
    const [numColumns, setNumColumns] = useState(2);
    const { width: windowWidth } = useWindowDimensions();

    // 2. Define your “ideal” widget width + gutter
    const idealWidgetWidth = 180;

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
                data={widgets}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CardWidget index={item.index} />
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
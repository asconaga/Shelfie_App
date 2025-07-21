import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from './theme';

const CardWidget = ({ index, onPress }) => {
    const t = useTheme();
    const [layout, setLayout] = useState({ width: 0, height: 0 });
    return (
        <Pressable onLayout={event => {
            const { width, height } = event.nativeEvent.layout;
            setLayout({ width, height });
        }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.card, { backgroundColor: t.card },
                pressed && { backgroundColor: t.pressed },
            ]}
        >
            <Text style={[styles.title, { color: t.textPrimary }]}>Book {index + 1}</Text>
            <Text style={[styles.subtitle, { color: t.textSecondary }]}>This is a simple card.</Text>

        </Pressable>
    )
}

export default CardWidget

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        margin: 4,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Android shadow
        elevation: 3,
        // ensure content does not stretch
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
    },
});
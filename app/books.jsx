import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Books = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Books</Text>
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
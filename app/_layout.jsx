import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const RootLayout = () => {
    return (
        <Stack screenOptions={{ headerStyle: { backgroundColor: '#f80' } }} />
    )
}

export default RootLayout

const styles = StyleSheet.create({
    footer: { flex: 1 }
})
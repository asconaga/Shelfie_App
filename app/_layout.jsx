import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Slot, Stack, Tabs } from 'expo-router'

const RootLayout = () => {
    const colorSchme = useColorScheme();
    console.log(colorSchme);
    return (

        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: '#000' },

            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        }}>
            <Tabs.Screen name="index" options={{ title: "Index" }} />
            <Tabs.Screen name="books" options={{ title: "Books" }} />
            <Tabs.Screen name="about" options={{ title: "About" }} />
        </Tabs>
    )
}

export default RootLayout

const styles = StyleSheet.create({
    footer: { flex: 1 }
})
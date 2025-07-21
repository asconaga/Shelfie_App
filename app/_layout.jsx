import { StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import { useTheme } from '../components/theme'

const RootLayout = () => {
    const t = useTheme();
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: t.background },

            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: t.textPrimary,
        }}>
            <Tabs.Screen name="index" options={{ title: "Index" }} />
            <Tabs.Screen name="books" options={{ title: "Books" }} />
            <Tabs.Screen name="contacts" options={{ title: "Contacts" }} />
            <Tabs.Screen name="pokeQuery" options={{ title: "Pokemon" }} />
            <Tabs.Screen name="about" options={{ title: "About" }} />

        </Tabs>
    )
}

export default RootLayout

const styles = StyleSheet.create({
    footer: { flex: 1 }
})
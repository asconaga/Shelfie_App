import { Image, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

import logo from '../assets/personwater.png'
import { useTheme } from '../components/theme.jsx';

const Home = () => {
    const t = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: t.background }]}>
            <Text style={[styles.title, { color: t.textPrimary }]}>Home</Text>
            <Image source={logo} style={styles.img} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    img: {
        borderRadius: 30,
    },
    link: {
        borderBottomWidth: 1
    }
});
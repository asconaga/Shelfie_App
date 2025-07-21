import { Image, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

import logo from '../assets/personwater.png'

const Home = () => {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.img} />
            <Text style={styles.title}>Home</Text>
            <Text>Reading List</Text>
            <Link style={styles.link} href="/about">About</Link>
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
        fontSize: 18
    },
    img: {
        borderRadius: 30,
    },
    link: {
        borderBottomWidth: 1
    }
});
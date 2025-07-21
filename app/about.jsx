import { Image, StyleSheet, Text, View } from 'react-native'

import logo from '../assets/clown2boris.jpg'
import { Link } from 'expo-router'

const About = () => {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.img} />
            <Text>About</Text>
            <Link style={styles.link} href={"/"}>Back Gnome</Link >
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        borderRadius: 30,
    },
    link: {
        borderBottomWidth: 1
    }
})
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import logo from '../assets/clown2boris.jpg'
import { Link } from 'expo-router'

const About = () => {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.img} />
            <Text>About</Text>
            <Link style={styles.link} href={"/"}>Back Gnome</Link >
            <Pressable
                onPress={() => alert('Dynamic style!')}
                android_ripple={{ color: 'white' }}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'dodgerblue' : 'skyblue',
                        transform: pressed ? [{ scale: 0.96 }] : [{ scale: 1 }],
                    },
                    styles.buttonBase,
                ]}
            >
                <Text style={styles.text}>Press Me</Text>
            </Pressable>
        </View >
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
    text: {
        fontSize: 18,
        color: '#333',
    },
    buttonBase: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 28,
    },
    link: {
        borderBottomWidth: 1
    }
})
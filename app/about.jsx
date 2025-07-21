import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import logo from '../assets/clown2boris.jpg'
import { useTheme } from '../components/theme';

const About = () => {
    const t = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: t.background }]}>
            <Text style={[styles.title, { color: t.textPrimary }]}>About</Text>
            <Image source={logo} style={styles.img} />
            <Pressable
                onPress={() => alert('Dynamic style!')}
                android_ripple={{ color: 'white' }}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? t.pressed : 'skyblue',
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
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        color: '#333',

    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
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
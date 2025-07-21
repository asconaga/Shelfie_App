import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';
import { useTheme } from '../components/theme';

/**
 * ContactsScreen:
 * - Requests permission to access device contacts.
 * - Fetches and displays contacts in a scrollable list.
 * - On tap, logs contact details (you can replace with navigation or detail view).
 */
export default function ContactsScreen() {
    const t = useTheme();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Contacts.requestPermissionsAsync();
                if (status !== 'granted') {
                    setError('Permission to access contacts was denied.');
                    setLoading(false);
                    return;
                }
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
                });
                setContacts(data);
            } catch (e) {
                console.error(e);
                setError('Failed to load contacts.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const renderItem = ({ item }) => {
        const phone = item.phoneNumbers && item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : '—';
        return (
            <TouchableOpacity style={styles.item} onPress={() => console.log(item)}>
                <Text style={[styles.name, { color: t.textPrimary }]} >{item.name}</Text>
                <Text style={[styles.detail, { color: t.textSecondary }]} >{phone}</Text>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.background }]}>
            <FlatList
                data={contacts}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    item: { padding: 16 },
    name: { fontSize: 16, fontWeight: '500' },
    detail: { fontSize: 14, color: '#666', marginTop: 4 },
    separator: { height: 1, backgroundColor: '#eee', marginHorizontal: 16 },
    error: { color: 'red', fontSize: 16 },
});

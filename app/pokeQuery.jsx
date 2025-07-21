import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Pressable,
    TextInput,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../components/theme';

/**
 * A screen that fetches Pokémon from the PokéAPI based on a name prefix.
 * Queries the API whenever the search text changes.
 * On tap of an item, shows basic details below the list, with a close button.
 * Image size adjusts: larger in portrait, smaller in landscape.
 * Shows count of matched Pokémon at bottom.
 */
export default function PokemonScreen() {
    const t = useTheme();
    const [loading, setLoading] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchText, setSearchText] = useState('');

    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;
    const imageSize = isPortrait ? 150 : 80;

    // Fetch list whenever searchText changes
    const fetchData = useCallback(async (prefix) => {
        setLoading(true);
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302');
            const json = await response.json();
            const filtered = json.results.filter(p =>
                p.name.toLowerCase().startsWith(prefix.toLowerCase())
            );
            setPokemonList(filtered);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(searchText);
    }, [searchText, fetchData]);

    useEffect(() => {
        if (!selectedPokemon || !selectedPokemon.url) return;
        (async () => {
            try {
                const response = await fetch(selectedPokemon.url);
                const details = await response.json();
                setSelectedPokemon(details);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [selectedPokemon?.url]);

    const handleSearchChange = text => {
        setSearchText(text);
        setSelectedPokemon(null);
    };

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: t.background }]}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.background }]}>
            <TextInput
                style={[styles.searchInput, { color: t.textPrimary }]}
                placeholder="Search Pokémon"
                value={searchText}
                onChangeText={handleSearchChange}
                autoCapitalize="none"
                clearButtonMode="while-editing"
            />
            <FlatList
                data={pokemonList}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => setSelectedPokemon(item)}
                    >
                        <Text style={[styles.itemText, { color: t.textPrimary }]}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.countContainer}>
                <Text style={[styles.countText, { color: t.textPrimary }]}>{pokemonList.length} Pokémon matched</Text>
            </View>
            {selectedPokemon && selectedPokemon.sprites && (
                <View style={[styles.detailCard, { backgroundColor: t.card }]}>
                    <Pressable onPress={() => setSelectedPokemon(null)} style={styles.closeButton}>
                        <Text style={[styles.closeText, { color: t.textPrimary }]}>✕</Text>
                    </Pressable>
                    <Text style={[styles.detailTitle, { color: t.textPrimary }]}>{selectedPokemon.name.toUpperCase()}</Text>
                    <Image
                        source={{ uri: selectedPokemon.sprites.front_default }}
                        style={[styles.pokemonImage, { width: imageSize, height: imageSize }]}
                    />
                    <Text style={[{ color: t.textPrimary }]}>Height: {selectedPokemon.height}</Text>
                    <Text style={[{ color: t.textPrimary }]} >Weight: {selectedPokemon.weight}</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 12,
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
    },
    countContainer: {
        padding: 8,
        alignItems: 'center',
    },
    countText: {
        fontSize: 14,
        fontWeight: '500',
    },
    detailCard: {
        position: 'relative',
        marginTop: 16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 4,
        zIndex: 1,
    },
    closeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    pokemonImage: {
        marginBottom: 8,
    },
});

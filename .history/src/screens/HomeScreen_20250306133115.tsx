import React, { useEffect, useState }  from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";

interface Pokemon {
    id: number;
    name: string;
    image: string;
    height: number;
    weight: number;
    types: string[];
    url: {
        sprites: {
            front_default: string;
        };
    };
}

const HomeScreen = () => {
    const [pokemones, setPokemones] = useState<Pokemon[]>([]);
    const [cargando, setCargando] = useState(true);
    const [pokemonSeleccionado, setPokemonSeleccionado] = useState<Pokemon | null>(null);

    useEffect(() => {
        const fetchPokemones = async () => {
            try {
                const respuesta = await fetch(  'https://pokeapi.co/api/v2/pokemon');
                if(!respuesta.ok) {
                    throw new Error('Error en la petición');
                }
                const data = await respuesta.json();

                const listaPokemon = await Promise.all(
                    data.results.map(async (pokemon: any) => {
                        const respuestaPokemon = await fetch(pokemon.url);
                        const details = await respuestaPokemon.json();
                        return {
                            id: details.id,
                            name: details.name,
                            image: details.sprites.front_default,
                            height: details.height,
                            weight: details.weight,
                            types: details.types.map((type: any) => type.type.name),
                            }
                    }
                ));
                setPokemones(listaPokemon);
            } catch (error) {
                console.log(error);
            } finally {
                setCargando(false);
            }
        }
        fetchPokemones();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Pokemones</Text>
            {cargando ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={pokemones}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => setPokemonSeleccionado(item)}>
                            <Image source={{ uri: item.image }} style={styles.imagen} />
                            <Text style={styles.titulo}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 100,
        backgroundColor: '#f8f8f8',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    item: {
        padding: 15,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 10,
    },
    imagen: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
});

export default HomeScreen;
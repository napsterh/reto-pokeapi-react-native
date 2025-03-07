import React, { useEffect, useState }  from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from "react-native";

interface Pokemon {
    name: string;
    url: string;
}

const HomeScreen = () => {
    const [pokemones, setPokemones] = useState<Pokemon[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchPokemones = async () => {
            try {
                const respuesta = await fetch(  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=200');
                if(!respuesta.ok) {
                    throw new Error('Error en la petición');
                }
                const data = await respuesta.json();
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
            <Text style={styles.titulo}>Pokemones</Text>
        {cargando ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
            <FlatList
                data={pokemones}
                keyExtractor={(pokemon) => pokemon.name}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image
                            style={styles.imagen}
                            source={{ uri: item.url }}
                        />
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
import React, { useEffect, useState }  from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native";

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
    const [pokemonesFiltrados, setPokemonesFiltrados] = useState<Pokemon[]>([]);
    const [cargando, setCargando] = useState(true);
    const [pokemonSeleccionado, setPokemonSeleccionado] = useState<Pokemon | null>(null);
    const [buscadorPorNombre, setBuscadorPorNombre] = useState('');

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
                setPokemonesFiltrados(listaPokemon);
            } catch (error) {
                console.log(error);
            } finally {
                setCargando(false);
            }
        }
        fetchPokemones();
    }, []);

    useEffect(() => {
        const filtrado = pokemones.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(buscadorPorNombre.toLowerCase())
        );
        setPokemonesFiltrados(filtrado);
    }, [buscadorPorNombre, pokemones]);


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Pokemones</Text>

            <TextInput
                style={styles.buscador}
                placeholder="Buscar por nombre"
                value={buscadorPorNombre}
                onChangeText={setBuscadorPorNombre}
            />

            {cargando ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={pokemonesFiltrados}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => setPokemonSeleccionado(item)}>
                            <Image source={{ uri: item.image }} style={styles.imagen} />
                            <Text style={styles.titulo}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            {pokemonSeleccionado && (
                <Modal visible={true} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitulo}>{pokemonSeleccionado.name}</Text>
                            <Image source={{ uri: pokemonSeleccionado.image }} style={styles.modalImagen} />
                            <Text style={styles.modalText} >Altura: {pokemonSeleccionado.height}</Text>
                            <Text style={styles.modalText} >Peso: {pokemonSeleccionado.weight}</Text>
                            <Text style={styles.modalText} >Tipos: {pokemonSeleccionado.types.join(', ')}</Text>
                            <TouchableOpacity style={styles.modalBoton} onPress={() => setPokemonSeleccionado(null)}>
                                <Text style={styles.modalBotonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 100, backgroundColor: '#f8f8f8',
    },
    titulo: {
        fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20,
    },
    item: {
        padding: 15, backgroundColor: '#fff', marginVertical: 5, borderRadius: 10,
    },
    imagen: {
        width: 50, height: 50, marginRight: 10,
    },
    modalContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 20, backgroundColor: '#fff', borderRadius: 10, elevation: 20,
    },
    modalTitulo: {
        fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20,
    },
    modalImagen: {
        width: 150, height: 150, alignSelf: 'center', marginBottom: 20,
    },
    modalText: {
        fontSize: 16, marginBottom: 10,
    },
    modalBoton: {
        backgroundColor: '#f8f8f8', padding: 10, borderRadius: 5, elevation: 2, alignSelf: 'center', marginTop: 20,
    },
    modalBotonText: {
        fontSize: 16,
    },
    buscador: {
        height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10,
    },
});

export default HomeScreen;
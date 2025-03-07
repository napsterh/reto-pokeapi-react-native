import React, { useEffect, useState, useContext }  from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [offset, setOffset] = useState(0);
    const limit = 20;

    // useEffect(() => {
    //   AsyncStorage.clear();
    // }, []);

    useEffect(() => {
      const cargarPokemones = async () => {
          setCargando(true);
          try {
              // Intentar cargar los datos desde AsyncStorage
              const storagePokemones = await AsyncStorage.getItem('pokemones');
              if (storagePokemones) {
                  const pokemonesGuardados = JSON.parse(storagePokemones);
                  setPokemones(pokemonesGuardados);
                  setPokemonesFiltrados(pokemonesGuardados);
                  setCargando(false);
                  return;
              }

              const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
              const respuesta = await fetch(url);
              if (!respuesta.ok) {
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
                      };
                  })
              );

              await AsyncStorage.setItem('pokemones', JSON.stringify(listaPokemon));

              setPokemones(listaPokemon);
              setPokemonesFiltrados(listaPokemon);
          } catch (error) {
              console.error(error);
          } finally {
              setCargando(false);
          }
      };

      cargarPokemones();
  }, []);

    useEffect(() => {
        const filtrado = pokemones.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(buscadorPorNombre.toLowerCase())
        );
        setPokemonesFiltrados(filtrado);
    }, [buscadorPorNombre, pokemones]);


    return (
        <View style={styles.container}>
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
                            <Text style={styles.modalTexto} >Altura: {pokemonSeleccionado.height}</Text>
                            <Text style={styles.modalTexto} >Peso: {pokemonSeleccionado.weight}</Text>
                            <Text style={styles.modalTexto} >Tipos: {pokemonSeleccionado.types.join(', ')}</Text>
                            <TouchableOpacity style={styles.modalBoton} onPress={() => setPokemonSeleccionado(null)}>
                                <Text style={styles.modalBotonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

          <View style={styles.pagination}>
              <TouchableOpacity
                  style={[styles.paginationButton, offset === 0 && styles.disabledButton]}
                  onPress={() => offset > 0 && setOffset(offset - limit)}
                  disabled={offset === 0}
              >
                  <Text style={styles.paginationButtonText}>Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.paginationButton}
                  onPress={() => setOffset(offset + limit)}
              >
                  <Text style={styles.paginationButtonText}>Siguiente</Text>
              </TouchableOpacity>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 25, backgroundColor: '#f8f8f8', width: '100%',
    },
    titulo: {
        fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20,
    },
    item: {
        padding: 0, backgroundColor: '#fff', marginVertical: 5, borderRadius: 10, alignItems: 'center',
    },
    imagen: {
        width: 100, height: 90, alignItems: 'center', justifyContent: 'center',
    },
    modalContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 20, backgroundColor: '#fff', borderRadius: 10, elevation: 20, width: '80%',
    },
    modalTitulo: {
        fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20,
    },
    modalImagen: {
        width: 200, height: 200, alignSelf: 'center', marginBottom: 20,
    },
    modalTexto: {
        fontSize: 20, marginBottom: 10,
    },
    modalBoton: {
        backgroundColor: '#f8f8f8', padding: 15, borderRadius: 5, elevation: 2, alignSelf: 'center', marginTop: 20,
    },
    modalBotonText: {
        fontSize: 16,
    },
    buscador: {
        height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 30, padding: 10, borderRadius: 15,
    },
    pagination: {
      flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 20, left: 20, right: 20,
  },
  paginationButton: {
      padding: 15, backgroundColor: '#007bff', borderRadius: 10,
  },
  disabledButton: {
      backgroundColor: '#cccccc',
  },
  paginationButtonText: {
      color: '#fff', fontSize: 16, textAlign: 'center',
  },
});

export default HomeScreen;
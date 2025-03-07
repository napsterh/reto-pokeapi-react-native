import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PokemonContextType {
    pokemones: string[];
}

export const PokemonContext = createContext<PokemonContextType | null>(null);

export const  PokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [pokemones, setPokemones] = useState<string[]>([]);

    useEffect(() => {
        const loadPokemones = async () => {
            const storagePokemones = await AsyncStorage.getItem('pokemones');
            if (storagePokemones) setPokemones(JSON.parse(storagePokemones));
        };
        loadPokemones();
    }, []);

    return <PokemonContext.Provider value={{ pokemones }}>{children}</PokemonContext.Provider>;
}
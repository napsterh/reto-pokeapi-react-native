import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { jest } from '@jest/globals';

// Simulación de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({}));

// Simulación de fetch
global.fetch = jest.fn((url) => {
    console.log('Mock fetch called with:', url); // Para depuración
  
    // Nos aseguramos de que `url` es una cadena antes de usar `startsWith`
    if (typeof url === 'string') {
      // Simula la respuesta para la lista de Pokémon
      if (url === 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            results: [
              { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
              // Añade más Pokémon si lo deseas
            ]
          }),
        });
      }
  
      // Simula la respuesta para los detalles de un Pokémon específico
      if (url.startsWith('https://pokeapi.co/api/v2/pokemon/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id: 1,
            name: 'bulbasaur',
            sprites: {
              front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            },
            height: 7,
            weight: 69,
            types: [
              { type: { name: 'grass' } },
              { type: { name: 'poison' } },
            ],
          }),
        });
      }
    }
  
    // En caso de que ninguna condición coincida, simula un error
    return Promise.reject(new Error('Not Found'));
  }) as jest.MockedFunction<typeof fetch>;

describe('HomeScreen', () => {
  test('Renderiza correctamente', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Recargar')).toBeTruthy();
  });

  test('Render del componente correctamente', () => {
    const component = render(<HomeScreen />);
    expect(component).toBeDefined();
  });

  test('Llama a la API correctamente en HomeScreen', async () => {
    render(<HomeScreen />);
  
    // Usa waitFor para esperar a que fetch sea llamado
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  
    // Verifica la llamada específica
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  });
});
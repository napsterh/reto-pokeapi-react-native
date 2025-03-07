import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { jest } from '@jest/globals';

// Simulación de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({}));

// Simulación de fetch
// Simulación de fetch
global.fetch = jest.fn((url) => {
    // Verificamos que estamos simulando la llamada correcta
    if (url === 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          ],
        }),
      });
    }
  
    // Para cualquier otra URL, podríamos devolver un error o una respuesta vacía
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

  test('Llama a la API correctamente en HomeScreen y muestra los datos', async () => {
    const { findByText } = render(<HomeScreen />);
  
    // Usa findByText para esperar que el nombre del Pokémon aparezca
    const bulbasaurElement = await findByText('bulbasaur');
    expect(bulbasaurElement).toBeTruthy();
  
    // Verifica que fetch fue llamado con la URL correcta
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  });
});
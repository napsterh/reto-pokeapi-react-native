import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { jest } from '@jest/globals';

// Simulación de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({}));

// Define una estructura de Response simulada
const mockFetchResponse = (data: any) => {
    return {
      ok: true,
      json: async () => data,
    } as Response;
  };
  
  // Simulación de fetch
  global.fetch = jest.fn(
    async () => mockFetchResponse({ results: [] })
  ) as jest.MockedFunction<typeof fetch>;

describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

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

    // Espera a que la llamada a fetch ocurra con la URL correcta
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1); // Verifica que fetch se llame una vez
      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    });
  });
});
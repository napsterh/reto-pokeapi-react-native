import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { jest } from '@jest/globals';

// Simulación de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({}));

// Simulación de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      results: [],
    }),
  } as Response)
) as jest.MockedFunction<typeof fetch>;

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
    
    // Espera a que la llamada a fetch ocurra
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    });
  });
});
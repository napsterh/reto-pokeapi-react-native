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

  test('Muestra bulbasaur después de la llamada a la API', async () => {
    const { getByText } = render(<HomeScreen />);

    // Espera a que el nombre "bulbasaur" aparezca en el componente
    await waitFor(() => {
      expect(getByText('bulbasaur')).toBeTruthy();
    });
  });
});
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { jest } from '@jest/globals';

// Simulación de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({}));

// Tipo para la respuesta de fetch
type FetchResponse = Partial<Response> & {
  ok: boolean;
  json: () => Promise<any>;
};

// Simulación de fetch
global.fetch = jest.fn((): Promise<FetchResponse> =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/' }
      ]
    }),
  })
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
    // Usa waitFor para esperar a que fetch sea llamado
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    // Luego comprueba la llamada específica
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  });
});
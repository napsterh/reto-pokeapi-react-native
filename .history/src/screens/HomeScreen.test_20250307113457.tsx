import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { jest } from '@jest/globals';
import AsyncStorageCustom from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => AsyncStorageCustom);


describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Render del componente correctamente', () => {
        const component = render(<HomeScreen />);
        expect(component).toBeDefined();
    });

    test('Renderiza correctamente boton anterior y siguiente', () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText('Anterior')).toBeTruthy();
        expect(getByText('Siguiente')).toBeTruthy();
    });

    test('Renderiza correctamente boton Recargar', () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText('Recargar')).toBeTruthy();
    });

    test('Renderiza el Buscador correctamente', () => {
        const { getByPlaceholderText } = render(<HomeScreen />);

        const textInput = getByPlaceholderText('Buscar por nombre');
        expect(textInput).toBeTruthy();

        expect(textInput.props.value).toBe('');
    });
});
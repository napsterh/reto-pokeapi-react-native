import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { jest } from '@jest/globals';

// Simulación de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({}));

describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Render del componente correctamente', () => {
        const component = render(<HomeScreen />);
        expect(component).toBeDefined();
    });

    test('Renderiza correctamente boton Recargar', () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText('Recargar')).toBeTruthy();
    });

    test('Renderiza correctamente boton Recargar', () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText('Recargar')).toBeTruthy();
    });
});
import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";
import { jest } from '@jest/globals';

type FetchResponse = Partial<Response> & {
    ok: boolean;
    json: () => Promise<any>;
};

global.fetch = jest.fn((): Promise<FetchResponse> =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
        results: [
            { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }
        ]
        }),
    })
) as jest.MockedFunction<typeof fetch>;

jest.mock('@react-native-async-storage/async-storage', () => require('../../__mocks__/@react-native-async-storage/async-storage'));


test('HomeScreen renders correctly', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Recargar')).toBeTruthy();
});

test("Muestra el render correctamente", () => {
    const component = render(<HomeScreen />);
    expect(component).toBeDefined();
});

test("Llama a la API correctamente en HomeScreen", () => {
    render(<HomeScreen />);

    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon");
});
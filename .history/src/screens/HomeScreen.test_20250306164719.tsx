import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";
import { jest } from '@jest/globals';

// Define un tipo que representa la estructura mínima de un Response
type FetchResponse = Partial<Response> & {
    ok: boolean;
    json: () => Promise<any>;
};

// Mock de la función global fetch
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

test("Renderiza la lista de pokemones correctamente", async () => {
    const { getByText } = render(<HomeScreen />);

    // Espera y verifica que el elemento con el texto "pikachu" esté presente en el documento
    await waitFor(() => {
        expect(getByText("bulbasaur")).toBeTruthy();
    });
});

test("Renderiza el modal correctamente", async () => {
    const { getByText, getByTestId } = render(<HomeScreen />);

    // Espera y verifica que el modal no esté presente en el documento
    await waitFor(() => {
        expect(() => getByTestId("modal")).toThrow();
    });

    // Simula el click en el botón de un pokemon
    getByText("bulbasaur").parentElement?.click();

    // Espera y verifica que el modal esté presente en el documento
    await waitFor(() => {
        expect(getByTestId("modal")).toBeTruthy();
    });
});
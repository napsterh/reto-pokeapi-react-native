import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";
import { jest } from '@jest/globals';

type FetchResponse = {
  ok: boolean;
  json: () => Promise<any>;
};

// Mock de la función global fetch
global.fetch = jest.fn((): Promise<FetchResponse> =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
        results: [
            { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" }
        ]
        }),
    })
    ) as jest.Mock;

    test("Renderiza la lista de pokemones correctamente", async () => {
    const { getByText } = render(<HomeScreen />);

    // Espera y verifica que el elemento con el texto "pikachu" esté presente en el documento
    await waitFor(() => {
        expect(getByText("pikachu")).toBeTruthy();
    });
});
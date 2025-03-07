import React from "react";
import { render, waitFor } from "@testing-library/react-native";
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

test("Muestra el render correctamente", () => {
    const component = render(<HomeScreen />);
    expect(component).toBeDefined();
});
import React from "react";
import { render, waitFor, expect } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";
import { jest, test } from '@jest/globals';

global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ results: [{ name: "pikachu", url: "" }] }),
    })
  ) as jest.Mock;

test("Renderiza la lista de pokemones correctamente!!", async () => {
    const { getByText } = render(<HomeScreen />);
    await waitFor(() =>
        expect(getByText("pikachu")).toBeTruthy());
});
import type { z } from "zod";
import type {  pokemonSchemas } from "./schema";
import type { PokemonTypes } from "./types";

const prompts = {
  generateDetails: ({
    type,
    details,
  }: {
    type?: PokemonTypes;
    details?: string;
  }) => {
    if (!details) {
      return `Generate the details for a random Pixelman (custom Pokemon).`;
    }
    const prompt = `Generate a Pixelman (custom Pokemon) with the following details: ${details}`;
    if (type) {
      return `${prompt} and type: ${type}`;
    }
    return prompt;
  },
  generateStats: ({
    details,
  }: {
    details: z.infer<typeof pokemonSchemas.details>;
  }) => {
    return `Generate highly accurate stats for a Pixelman (custom Pokemon) with the following details: ${JSON.stringify(details)}`;
  },
  generateMoves: ({
    details,
  }: {
    details: z.infer<typeof pokemonSchemas.details>;
  }) => {
    return `Generate four (4) custom moves for a Pixelman (custom Pokemon) with the following details: ${JSON.stringify(details)}`;
  },
};

export default prompts;

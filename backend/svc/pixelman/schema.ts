import { z } from "zod";
import { PokemonTypes } from "./types";

const move = z.object({
  name: z.string(),
  type: z.nativeEnum(PokemonTypes),
  description: z.string(),
  power: z
    .number()
    .int()
    .positive()
    .lte(100)
    .describe(
      "The move's power. This should be tailor-made for the Pokemon's rarity. Power is a number between 1 and 100."
    ),
  accuracy: z
    .number()
    .int()
    .positive()
    .lte(100)
    .describe(
      "The move's accuracy. This should be tailor-made for the Pokemon's rarity. Accuracy is a number between 1 and 100."
    ),
});

const defaultMoves = z
  .array(move)
  .length(4)
  .describe(
    "An array of 4 moves that this Pokemon will know by default. More rare pokemon should have more powerful moves. All stats are between 1 and 100."
  );

const details = z.object({
  name: z.string(),
  description: z
    .string()
    .describe(
      "The Pokemon's description. This should be a 3 sentence description of the Pokemon."
    ),
  type: z.nativeEnum(PokemonTypes).describe("The Pokemon's power type."),
  gender: z.enum(["Male", "Female"]).describe("The Pokemon's gender."),
  rarity: z
    .enum(["Common", "Uncommon", "Rare", "Ultra Rare"])
    .describe("The Pokemon's rarity."),
});

const baseStats = z.object({
  hp: z
    .number()
    .int()
    .positive()
    .lt(100)
    .describe(
      "The Pokemon's default HP stat, between 1 and 100. This should be tailor-made for the Pokemon's rarity."
    ),
  attack: z
    .number()
    .int()
    .positive()
    .lt(100)
    .describe(
      "The Pokemon's default attack stat, between 1 and 100. This should be tailor-made for the Pokemon's rarity."
    ),
  defense: z
    .number()
    .int()
    .positive()
    .lt(100)
    .describe(
      "The Pokemon's default defense stat, between 1 and 100. This should be tailor-made for the Pokemon's rarity."
    ),
  speed: z
    .number()
    .int()
    .positive()
    .lt(100)
    .describe(
      "The Pokemon's default speed stat, between 1 and 100. This should be tailor-made for the Pokemon's rarity."
    ),
});

export const pokemonSchema = z.object({
  details,
  defaultMoves,
  stats: baseStats,
});

const movesAsObject = z.object({
  data: defaultMoves,
});

export const pokemonSchemas = {
  details,
  defaultMoves,
  baseStats,
  movesAsObject,
};

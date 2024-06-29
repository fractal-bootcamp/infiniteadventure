import { promptWithSchema } from "@b/lib/prompt";
import prompts from "./prompt";
import { PokemonTypes } from "./types";
import { pokemonSchemas } from "./schema";
import client from "prisma/client";

const PixelmanService = () => ({
  generate: async (details: string) => {

    // GET DETAILS
    const prompt = prompts.generateDetails({
      type: PokemonTypes.Fire,
      details,
    });
    const response = await promptWithSchema(prompt, pokemonSchemas.details);


    // GET STATS
    const statsPrompt = prompts.generateStats({
      details: response
    })
    const statsResponse = await promptWithSchema(statsPrompt, pokemonSchemas.baseStats);


    // GET MOVES
    const movesPrompt = prompts.generateMoves({
      details: response
    })
    const movesResponse = await promptWithSchema(movesPrompt, pokemonSchemas.movesAsObject);


    // PUT IT ALL TOGETHER
    const pokemon = {
        details: response,
        stats: statsResponse,
        moves: movesResponse.data,
    }

    const pixelDex = await client.pixelDex.create({
      data: {
        name: pokemon.details.name,
        description: pokemon.details.description,
        type: pokemon.details.type,
        hp: pokemon.stats.hp,
        attack: pokemon.stats.attack,
        defense: pokemon.stats.defense,
        speed: pokemon.stats.speed,
        moves: {
          create: pokemon.moves.map((move) => ({
            name: move.name,
            description: move.description,
            type: move.type,
            power: move.power,
            accuracy: move.accuracy,
          })),
        },
      },
    });

    console.log("New pokemon created!", pixelDex);

    return pixelDex;
  },
  get: async (id: string) => {
    const pixelDex = await client.pixelDex.findUnique({
      where: {
        id,
      },
      include: {
        moves: true,
      }
    });
    return pixelDex;
  },
  getAll: async () => {
    const pixelDex = await client.pixelDex.findMany({
      include: {
        moves: true,
      }
    });
    return pixelDex;
  },
});

export default PixelmanService;

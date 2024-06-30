import { promptWithSchema } from "@b/lib/prompt";
import prompts from "./prompt";
import { PokemonTypes } from "./types";
import { pokemonSchemas } from "./schema";
import client from "prisma/client";
import { generatePixelman } from "./utils";

const PixelmanService = () => ({
  generate: async ({
    details,
    type,
  }: {
    details: string;
    type: PokemonTypes;
  }) => {

    // GET DETAILS
    const prompt = prompts.generateDetails({
      type,
      details,
    });
    const response = await promptWithSchema(prompt, pokemonSchemas.details);

    // GET STATS
    const statsPrompt = prompts.generateStats({
      details: response,
    });
    const statsResponse = await promptWithSchema(
      statsPrompt,
      pokemonSchemas.baseStats
    );

    // GET MOVES
    const movesPrompt = prompts.generateMoves({
      details: response,
    });
    const movesResponse = await promptWithSchema(
      movesPrompt,
      pokemonSchemas.movesAsObject
    );

    // PUT IT ALL TOGETHER
    const pokemon = {
      details: response,
      stats: statsResponse,
      moves: movesResponse.data,
    };

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

    await PixelmanService().generateImages(pixelDex.id);

    console.log("New pokemon created!", pixelDex);

    return pixelDex;
  },
  generateImages: async (id: string) => {
    const pixelDex = await client.pixelDex.findUnique({
      where: {
        id,
      },
    });

    if (!pixelDex) {
      throw new Error("PixelDex not found");
    }

    const details = {
      name: pixelDex.name,
      description: pixelDex.description,
      type: pixelDex.type,
    };

    const frontImagePrompt = prompts.generateImage({
      details: JSON.stringify(details),
      orientation: "front",
    });

    const backImagePrompt = prompts.generateImage({
      details: JSON.stringify(details),
      orientation: "back",
    });

    const frontImage = await generatePixelman(
      pixelDex.name,
      frontImagePrompt,
      "front"
    );
    const backImage = await generatePixelman(pixelDex.name, backImagePrompt, "back");

    const [frontUrl, backUrl] = await Promise.all([frontImage, backImage]);

    const updatedPixelDex = await client.pixelDex.update({
      where: {
        id,
      },
      data: {
        frontImg: frontUrl,
        backImg: backUrl,
      },
    });

    return updatedPixelDex;
  },
  get: async (id: string) => {
    const pixelDex = await client.pixelDex.findUnique({
      where: {
        id,
      },
      include: {
        moves: true,
      },
    });
    return pixelDex;
  },
  getAll: async () => {
    const pixelDex = await client.pixelDex.findMany({
      include: {
        moves: true,
      },
    });
    return pixelDex;
  },
  getRandom: async () => {
    const pixelDex = await client.pixelDex.findMany({
      include: {
        moves: true,
      },
    });

    const random = pixelDex[Math.floor(Math.random() * pixelDex.length)];

    return random;
  },
});

export default PixelmanService;

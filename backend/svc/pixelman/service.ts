import { promptWithSchema } from "@b/lib/prompt";
import prompts from "./prompt";
import { PokemonTypes } from "./types";
import { pokemonSchemas } from "./schema";

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
        moves: movesResponse,
    }

    return pokemon;
  },
});

export default PixelmanService;

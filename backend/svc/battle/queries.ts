import client from "prisma/client";
import type { Pokemon, Battle } from "./types";

const BattleQueries = () => {
  return {
    startBattle: async (userPokemon: Pokemon, opponentPokemon: Pokemon) => {
        const battle: Battle = {
            userPokemon,
            opponentPokemon,
            round: 1,
            winner: null,
        }


      const data = await client.battle.create({
        data: {
            battle
        },
      });

      return data;
    },
    getBattle: async (id: string) => {
      const battle = await client.battle.findUnique({
        where: {
          id,
        },
      });

      return battle
    },
    updateBattle: async (id: string, data: Battle) => {
      const battle = await client.battle.update({
        where: {
          id,
        },
        data: {
            battle: {
                ...data
            }
        },
      });

      return battle;
    },

  };
};

export default BattleQueries;
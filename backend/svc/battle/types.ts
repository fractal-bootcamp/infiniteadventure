import type { Move, PixelDex } from "@prisma/client";

type DBBattle = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  battle: Battle;
};

type PixelDexWithMoves = PixelDex & {
    moves: Move[];
}

type Pokemon = PixelDexWithMoves & BattleStats;

type BattleStats = {
    health: number;
}

type Battle = {
    userPokemon: Pokemon;
    opponentPokemon: Pokemon;
    round: number;
    winner: "user" | "opponent" | "draw" | null;
};


export type { DBBattle, Pokemon, Battle };
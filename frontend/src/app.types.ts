// types.ts

export interface Move {
    name: string;
    description: string;
    type: string;
    power: number;
    accuracy: number;
  }
  
  export interface Pokemon {
    name: string;
    type: string;
    description: string;
    frontImg: string;
    backImg: string;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    moves: Move[];
  }
  
  export interface PokemonCardProps {
    pokemon: Pokemon;
    isOpponent: boolean;
  }
  
  export interface MoveButtonProps {
    move: Move;
    onClick: () => void;
  }
  
  export interface PokemonFightSceneProps {
    userPokemon: Pokemon;
    opponentPokemon: Pokemon;
  }
  
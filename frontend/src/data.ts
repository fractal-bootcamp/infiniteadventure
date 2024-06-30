import { useEffect, useState } from "react";
import { Move, Pokemon } from "./app.types";

const fakePokemonMoves: Move[] = [{
  name: "Thunder Punch",
  description: "Thunder Punch is a move that inflicts damage to the opponent by causing them to faint.",
  type: "Electric",
  power: 100,
  accuracy: 100,
},
{
  name: "Tackle",
  description: "Tackle is a move that inflicts damage to the opponent by causing them to faint.",
  type: "Normal",
  power: 100,
  accuracy: 100,
},
{
  name: "Electric Ball",
  description: "Electric Ball is a move that inflicts damage to the opponent by causing them to faint.",
  type: "Electric",
  power: 100,
  accuracy: 100,
},
{
  name: "Bite",
  description: "Bite is a move that inflicts damage to the opponent by causing them to faint.",
  type: "Dark",
  power: 100,
  accuracy: 100,
}
]

const fakePokemon = {
  name: "Pikachu",
  type: "Electric",
  description: "Pikachu is a yellow mouse-like Pokemon with a tail that is shaped like a lightning bolt.",
  frontImg: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
  backImg: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
  hp: 100,
  attack: 100,
  defense: 100,
  speed: 100,
  moves: fakePokemonMoves,
}

const fakePokemon2 = {
  name: "Bulbasaur",
  type: "Grass",
  description: "Bulbasaur is a green Pokemon that is known for its ability to grow and thrive.",
  frontImg: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  backImg: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  hp: 100,
  attack: 100,
  defense: 100,
  speed: 100,
  moves: fakePokemonMoves,
}

const serverURL = "http://localhost:8000";

const getNewPokemon = async () => {
    const response = await fetch(`${serverURL}/new_pokemon`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

const getExistingPokemon = async () => {
    const response = await fetch(`${serverURL}/pokemon`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export const usePokeController = () => {
    const [userPokemon, setUserPokemon] = useState<Pokemon>();
    const [opponentPokemon, setOpponentPokemon] = useState<Pokemon>();


    useEffect(() => {
        try {
            getExistingPokemon().then((pokemon) => {
                setOpponentPokemon(pokemon);
            });
            getExistingPokemon().then((pokemon) => {
                setUserPokemon(pokemon);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);


    const onFreshPokemon = () => {
        try {
            getNewPokemon().then((pokemon) => {
                setOpponentPokemon(pokemon);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const onSwap = () => {
        const temp = userPokemon;
        setUserPokemon(opponentPokemon);
        setOpponentPokemon(temp);

        onFreshPokemon();
    }



console.log(userPokemon, opponentPokemon);

    return {
        userPokemon,
        opponentPokemon,
        onFreshPokemon,
        onSwap,
    }

}
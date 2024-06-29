import { z } from "zod";

const move = z.object({
    name: z.string(),
    // type: z.enum(Object.keys(PokemonTypes)),
    description: z.string(),
})

const schema =  z.object({
    details: z.object({
        name: z.string(),
        description: z.string(),
        // type: z.enum(Object.values(PokemonTypes)),
    }),
    defaultMoves: z.array(move).length(4).describe("An array of 4 moves that this Pokemon will know by default"),
    stats: z.object({
        hp: z.number().int().positive().describe("The Pokemon's HP stat"),
        attack: z.number().int().positive().describe("The Pokemon's attack stat"),
        defense: z.number().int().positive().describe("The Pokemon's defense stat"),
        specialAttack: z.number().int().positive().describe("The Pokemon's special attack stat"),
        specialDefense: z.number().int().positive().describe("The Pokemon's special defense stat"),
    })
})


enum PokemonTypes {
Normal,
Fire,
Water,
Electric,
Grass,
Ice,
Fighting,
Poison,
Ground,
Flying,
Psychic,
Bug,
Rock,
Ghost,
Dragon,
Dark,
Steel,
Fairy
}

const EffectivenessMap: Record<PokemonTypes, {
    superEffective: PokemonTypes[],
    notEffective: PokemonTypes[],
    noEffect: PokemonTypes[]
}> = {
    [PokemonTypes.Normal]: {
        superEffective: [],
        notEffective: [PokemonTypes.Rock, PokemonTypes.Steel],
        noEffect: [PokemonTypes.Ghost]
    },
    [PokemonTypes.Fire]: {
        superEffective: [PokemonTypes.Grass, PokemonTypes.Ice, PokemonTypes.Bug, PokemonTypes.Steel],
        notEffective: [PokemonTypes.Fire, PokemonTypes.Water, PokemonTypes.Rock, PokemonTypes.Dragon],
        noEffect: []
    },
    [PokemonTypes.Water]: {
        superEffective: [PokemonTypes.Fire, PokemonTypes.Ground, PokemonTypes.Rock],
        notEffective: [PokemonTypes.Water, PokemonTypes.Grass, PokemonTypes.Dragon],
        noEffect: []
    },
    [PokemonTypes.Electric]: {
        superEffective: [PokemonTypes.Water, PokemonTypes.Flying],
        notEffective: [PokemonTypes.Electric, PokemonTypes.Grass, PokemonTypes.Dragon],
        noEffect: [PokemonTypes.Ground]
    },
    [PokemonTypes.Grass]: {
        superEffective: [PokemonTypes.Water, PokemonTypes.Ground, PokemonTypes.Rock],
        notEffective: [PokemonTypes.Fire, PokemonTypes.Grass, PokemonTypes.Poison, PokemonTypes.Flying, PokemonTypes.Bug, PokemonTypes.Dragon, PokemonTypes.Steel],
        noEffect: []
    },
    [PokemonTypes.Ice]: {
        superEffective: [PokemonTypes.Grass, PokemonTypes.Ground, PokemonTypes.Flying, PokemonTypes.Dragon],
        notEffective: [PokemonTypes.Fire, PokemonTypes.Water, PokemonTypes.Ice, PokemonTypes.Steel],
        noEffect: []
    },
    [PokemonTypes.Fighting]: {
        superEffective: [PokemonTypes.Normal, PokemonTypes.Ice, PokemonTypes.Rock, PokemonTypes.Dark, PokemonTypes.Steel],
        notEffective: [PokemonTypes.Poison, PokemonTypes.Flying, PokemonTypes.Psychic, PokemonTypes.Bug, PokemonTypes.Fairy],
        noEffect: [PokemonTypes.Ghost]
    },
    [PokemonTypes.Poison]: {
        superEffective: [PokemonTypes.Grass, PokemonTypes.Fairy],
        notEffective: [PokemonTypes.Poison, PokemonTypes.Ground, PokemonTypes.Rock, PokemonTypes.Ghost],
        noEffect: [PokemonTypes.Steel]
    },
    [PokemonTypes.Ground]: {
        superEffective: [PokemonTypes.Fire, PokemonTypes.Electric, PokemonTypes.Poison, PokemonTypes.Rock, PokemonTypes.Steel],
        notEffective: [PokemonTypes.Grass, PokemonTypes.Bug],
        noEffect: [PokemonTypes.Flying]
    },
    [PokemonTypes.Flying]: {
        superEffective: [PokemonTypes.Grass, PokemonTypes.Fighting, PokemonTypes.Bug],
        notEffective: [PokemonTypes.Electric, PokemonTypes.Rock, PokemonTypes.Steel],
        noEffect: []
    },
    [PokemonTypes.Psychic]: {
        superEffective: [PokemonTypes.Fighting, PokemonTypes.Poison],
        notEffective: [PokemonTypes.Psychic, PokemonTypes.Steel],
        noEffect: [PokemonTypes.Dark]
    },
    [PokemonTypes.Bug]: {
        superEffective: [PokemonTypes.Grass, PokemonTypes.Psychic, PokemonTypes.Dark],
        notEffective: [PokemonTypes.Fire, PokemonTypes.Fighting, PokemonTypes.Poison, PokemonTypes.Flying, PokemonTypes.Ghost, PokemonTypes.Steel, PokemonTypes.Fairy],
        noEffect: []
    },
    [PokemonTypes.Rock]: {
        superEffective: [PokemonTypes.Fire, PokemonTypes.Ice, PokemonTypes.Flying, PokemonTypes.Bug],
        notEffective: [PokemonTypes.Fighting, PokemonTypes.Ground, PokemonTypes.Steel],
        noEffect: []
    },
    [PokemonTypes.Ghost]: {
        superEffective: [PokemonTypes.Psychic, PokemonTypes.Ghost],
        notEffective: [PokemonTypes.Dark],
        noEffect: [PokemonTypes.Normal]
    },
    [PokemonTypes.Dragon]: {
        superEffective: [PokemonTypes.Dragon],
        notEffective: [PokemonTypes.Steel],
        noEffect: [PokemonTypes.Fairy]
    },
    [PokemonTypes.Dark]: {
        superEffective: [PokemonTypes.Psychic, PokemonTypes.Ghost],
        notEffective: [PokemonTypes.Fighting, PokemonTypes.Dark, PokemonTypes.Fairy],
        noEffect: []
    },
    [PokemonTypes.Steel]: {
        superEffective: [PokemonTypes.Ice, PokemonTypes.Rock, PokemonTypes.Fairy],
        notEffective: [PokemonTypes.Fire, PokemonTypes.Water, PokemonTypes.Electric, PokemonTypes.Steel],
        noEffect: []
    },
    [PokemonTypes.Fairy]: {
        superEffective: [PokemonTypes.Fighting, PokemonTypes.Dragon, PokemonTypes.Dark],
        notEffective: [PokemonTypes.Fire, PokemonTypes.Poison, PokemonTypes.Steel],
        noEffect: []
    }
}

export const getEffectiveness = (attackingType: PokemonTypes, defendingType: PokemonTypes) => {
    const effectiveness = EffectivenessMap[attackingType]
    if (effectiveness.superEffective.includes(defendingType)) return 2
    if (effectiveness.notEffective.includes(defendingType)) return 0.5
    return 1
}
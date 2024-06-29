
import z from 'zod';


export const LocationType = z.enum(['Dungeon', 'Cave', 'Castle']);

export const Tile = z.object({
  type: z.string(),
  walkable: z.boolean(),
  description: z.string().optional()
});

export const FeatureType = z.enum(['Enemy', 'Chest', 'Pool', 'Pit', 'Grass']);

export const Feature = z.object({
  type: FeatureType,
  description: z.string().optional()
});

export const Location = z.object({
  name: z.string(),
  description: z.string(),
  locationType: LocationType,
  grid: z.array(Tile).length(256),
  features: z.array(Feature),
  left: Location,

});

export type Location = z.infer<typeof Location>


export const Game = z.object({
  currentLocation: Location,
  playerTile: Tile,
  playerTeam: z.array(z.object({
    name: z.string(),
    type: z.string(),
    level: z.number(),
    moves: z.array(z.string())
  }))
});

export type Game = z.infer<typeof Game>
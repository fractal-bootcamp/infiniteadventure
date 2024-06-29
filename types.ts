
import z from 'zod';


const LocationType = z.enum(['Dungeon', 'Cave', 'Castle']);

const Tile = z.object({
  type: z.string(),
  walkable: z.boolean(),
  description: z.string().optional()
});

const FeatureType = z.enum(['Enemy', 'Chest', 'Pool', 'Pit', 'Grass']);

const Feature = z.object({
  type: FeatureType,
  description: z.string().optional()
});

const Location = z.object({
  name: z.string(),
  description: z.string(),
  locationType: LocationType,
  grid: z.array(Tile).length(256),
  features: z.array(Feature)
});


const Game = z.object({
  currentLocation: Location,
  playerTile: Tile,
  playerTeam: z.array(z.object({
    name: z.string(),
    type: z.string(),
    level: z.number(),
    moves: z.array(z.string())
  }))
});

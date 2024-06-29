import z from "zod";

export const locationTypeSchema = z.enum([
  "Dungeon",
  "Cave",
  "Castle",
  "Forest"
]);
export const tileTypeSchema = z.enum(["grass"]);

export const tileSchema = z.object({
  type: tileTypeSchema,
  walkable: z.boolean(),
  description: z.string().optional()
});

export const featureTypeSchema = z.enum([
  "Enemy",
  "Chest",
  "Pool",
  "Pit",
  "Grass"
]);

export const featureSchema = z.object({
  type: featureTypeSchema,
  description: z.string().optional()
});

export const terrainType = z.enum(["Enemy", "Chest", "Pool", "Pit", "Grass"]);
export const terrainSchema = z.object({
  type: featureTypeSchema,
  description: z.string().optional()
});

export const locationSchema = z.object({
  name: z.string(),
  description: z.string(),
  locationType: locationTypeSchema,
  grid: z.array(tileSchema).length(256),
  features: z.array(featureSchema),
  terrain: z.array(terrainSchema),
  x: z.number(),
  y: z.number()
});

export type Location = z.infer<typeof locationSchema>;
export type LocationWithChildren = Location & {
  left?: Location;
  right?: Location;
  top?: Location;
  bottom?: Location;
};

export const Game = z.object({
  currentLocation: locationSchema, //current map region
  playerPosition: z.number(), //player's position in the current location
  playerTeam: z.optional(
    z.array(
      z.object({
        name: z.string(),
        type: z.string(),
        level: z.number(),
        moves: z.array(z.string())
      })
    )
  )
});

export type Game = z.infer<typeof Game>;

import { Game, tileSchema } from "types";

type Direction = "up" | "down" | "left" | "right";

const movePlayer = (game: Game, direction: Direction): Game => {
  //relative changes to playerPosition based on direction
  //playerPosition is a location on game.grid 1D 256 array, so L and R are -/+1 and U and D are -/+16
  const displacements = {
    up: 16,
    down: -16,
    left: -1,
    right: 1
  };
  //check if target tile exists and is walkable
  const targetTileIndex = game.playerPosition + displacements[direction];
  if (
    game.currentLocation.grid[targetTileIndex] &&
    game.currentLocation.grid[targetTileIndex].walkable
  ) {
    return { ...game, playerPosition: targetTileIndex };
  } else return game;
};

import type { Location } from "types";

export type Direction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN'

export const exampleBaseLocation: Location = {
  name: "The Enchanted Forest",
  description: "A mysterious forest teeming with magical creatures and ancient secrets.",
  locationType: "forest",
  grid: Array(256).fill({
    type: "grass",
    walkable: true,
    interactive: false
  }),
  features: [
    {
      type: "enemy",
      description: "A lurking shadow beast with piercing red eyes.",
      size: 1,
    },
    {
      type: "chest",
      description: "An old wooden chest, covered in moss and vines.",
      size: 1,
    }
  ],
  terrain: Array(10).fill({}).map(() => ({
    type: 'forest',
    description: 'A dense patch of trees, too thick to pass through.'
  })),
  x: 0,
  y: 0
}

function getNextLocation(parent: Location, direction: Direction) {

}
import type { Location } from "types";

export type Direction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN'

const exampleBaseLocation: Location = {
  name: "The Enchanted Forest",
  description: "A mysterious forest teeming with magical creatures and ancient secrets.",
  locationType: "Forest",
  grid: Array(256).fill({
    type: "grass",
    walkable: true,
    object: null
  }),
  features: [
    {
      type: "Enemy",
      description: "A lurking shadow beast with piercing red eyes."
      size: 1,
    },
    {
      type: "Chest",
      description: "An old wooden chest, covered in moss and vines.",
      size: 1,
    }
  ],
  x: 0,
  y: 0
}

function getNextLocation(parent: Location, direction: Direction) {

}
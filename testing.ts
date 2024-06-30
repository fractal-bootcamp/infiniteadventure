import PixelmanService from "@b/svc/pixelman/service";
import client from "prisma/client";

const service = PixelmanService();

// const response = await service.generate({
//   details: "A horny turtle.",
//   type: PokemonTypes.Water,
// });

const po = await client.pixelDex.findMany();
po.forEach(async (poke) => {

    await service.generateImages(poke.id)
})

const pokemon = await service.getAll();

console.log(JSON.stringify(pokemon, undefined, 2));

client.$disconnect();
import PixelmanService from "@b/svc/pixelman/service";

const service = PixelmanService();

// const response = await service.generate("I found this little guy in the forest. She's extremely.");

const pokemon = await service.getAll();

console.log(JSON.stringify(pokemon));
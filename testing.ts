import PixelmanService from "@b/svc/pixelman/service";

const service = PixelmanService();

const response = await service.generate("I found this little guy in the forest. She's extremely cute and rare.");
console.log(JSON.stringify(response, null, 3));
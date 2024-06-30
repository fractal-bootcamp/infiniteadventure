// express boilerplate
import PixelmanService from "@b/svc/pixelman/service";
import { EffectivenessMap, PokemonTypes } from "@b/svc/pixelman/types";
import express from "express"
import path from "path";
const app = express();


app.use(express.json());
app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.post('/new_pokemon', async (req: express.Request, res: express.Response) =>  {
    console.log("getting random pokemon");
    // get details 
    const type = Object.keys(EffectivenessMap)[Math.floor(Math.random() * Object.keys(EffectivenessMap).length)];

    const pokemon = await PixelmanService().generate({
    details: "This should be one of the most random pixelmans ever.",
    type: type as PokemonTypes,
    })

    res.json(pokemon);
});

app.get('/pokemon', async (req: express.Request, res: express.Response) => {
    res.json(await PixelmanService().getRandom());
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
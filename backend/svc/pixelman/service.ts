import { promptWithSchema } from "@b/lib/prompt";
import { z } from "zod";

const PixelmanService = () => {
    const generate = async (prompt: string) => {
        const response = await promptWithSchema(prompt, z.object({
            image: z.string(),
        }));
    }
}

export default PixelmanService;
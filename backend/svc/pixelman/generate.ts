import { promptWithSchema } from "@b/svc/lib/prompt";
import { z } from "zod";

const PixelmanService = () => {
    const generate = async (prompt: string) => {
        const response = await promptWithSchema(prompt, z.object({
            image: z.string(),
        }));
    }
}
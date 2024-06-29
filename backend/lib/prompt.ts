import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai";
import { z } from "zod";
import readline from "readline";

const oai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? undefined,
  organization: process.env.OPENAI_ORG_ID ?? undefined,
});

const client = Instructor({
  client: oai,
  mode: "TOOLS",
});

export const promptWithSchema = async (
  prompt: string,
  schema: z.ZodObject<any>
) => {
  const response = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    response_model: {
      schema: schema,
      name: "User",
    },
  });
  return response;
};
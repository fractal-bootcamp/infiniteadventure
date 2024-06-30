import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai";
import { z } from "zod";

const oai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"] ?? undefined,
  organization: process.env["OPENAI_ORG_ID"] ?? undefined,
});

const client = Instructor({
  client: oai,
  mode: "TOOLS",
});

export const promptWithSchema = async <T extends z.ZodObject<any>>(
  prompt: string,
  schema: T
) => {
  const response = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    max_retries: 2,
    model: "gpt-3.5-turbo",
    response_model: {
      schema: schema,
      name: "Object",
    },
  });
  return response;
};
import axios from "axios";
import fs from "fs";

const OPENAI_API_KEY = process.env["OPENAI_API_KEY"];

export async function generatePixelman(name: string, prompt: string, orientation: "front" | "back"): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-2",
        prompt: `A pixel art style pixelman (custom pokemon): ${prompt}`,
        n: 1,
        size: "256x256",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const url = response.data.data[0].url;

    // fetch the image and save locally to an assets folder
    const image = await axios.get(url, { responseType: "arraybuffer" });
    
    // make sure the file type matches
    fs.writeFileSync(`assets/${name}-${orientation}.png`, image.data);

    return `assets/${name}-${orientation}.png`;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
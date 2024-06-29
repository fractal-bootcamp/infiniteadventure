import axios from "axios";
import * as readline from "readline";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface PixelArtData {
  width: number;
  height: number;
  palette: string[];
  data: string;
}

function constructSVG(pixelArtData: PixelArtData): string {
  const { width, height, palette, data } = pixelArtData;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const colorIndex = parseInt(data[y * width + x], 36);
      if (colorIndex !== 0) {
        // Assuming 0 is transparent
        svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="${
          palette[colorIndex - 1]
        }"/>`;
      }
    }
  }

  svg += "</svg>";
  return svg;
}

async function generatePixelArtSVG(): Promise<void> {
  try {
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `Generate a 32x32 pixel art monster in the style of Pokémon. Use only 4 colors maximum (excluding transparent). 
            Represent the pixel art as follows:
            1. A comma-separated list of hex color codes (e.g., #FF0000,#00FF00,#0000FF,#FFFF00)
            2. A string of numbers where each character represents a pixel: 0 for transparent, 1-4 for colors in the palette
            Provide only this data without any explanation or additional text.`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
        },
      }
    );

    const rawContent = response.data.content[0].text.trim();
    const [paletteString, pixelData] = rawContent.split("\n");

    const pixelArtData: PixelArtData = {
      width: 32,
      height: 32,
      palette: paletteString.split(","),
      data: pixelData,
    };

    const svgContent = constructSVG(pixelArtData);

    console.log("SVG generated successfully:");
    console.log(svgContent);

    // Save the SVG to a file
    const fs = require("fs");
    fs.writeFileSync("pixel_art_monster.svg", svgContent);
    console.log("SVG saved to pixel_art_monster.svg");
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

rl.question("Press Enter to generate a pixel art monster SVG...", async () => {
  await generatePixelArtSVG();
  rl.close();
});

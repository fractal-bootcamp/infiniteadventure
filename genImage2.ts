import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in the environment variables');
}

async function generatePixelMonsterImage(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: "dall-e-2",
        prompt: `A pixel art style monster: ${prompt}`,
        n: 1,
        size: '256x256',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const imageUrl = await generatePixelMonsterImage('A cute blue slime monster');
    console.log('Generated image URL:', imageUrl);
  } catch (error) {
    console.error('Failed to generate image:', error);
  }
})();
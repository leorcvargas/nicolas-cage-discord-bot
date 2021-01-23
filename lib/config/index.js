import * as dotenv from 'dotenv';

dotenv.config();

export default {
  giphyApiKey: process.env.GIPHY_API_KEY,
  discordToken: process.env.DISCORD_TOKEN,
};

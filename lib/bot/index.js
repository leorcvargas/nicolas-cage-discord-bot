import Discord from 'discord.io';

import logger from '../utils/logger';
import { searchRandomGIF } from '../giphy';
import config from '../config';

const prefix = '!nc';

const createBotClient = () => new Discord.Client({
  token: config.discordToken,
});

export const initBot = () => {
  const bot = createBotClient();

  bot.on('ready', () => {
    logger.info(`Connected ${bot.username} - ${bot.id}`);
  });


  bot.on('message', async (user, userID, channelID, message) => {
    try {
      if (!message.startsWith(prefix)) {
        return;
      }

      const args = message
        .slice(prefix.length)
        .split(' ')
        .filter((term) => !!term);
      const command = args.shift().toLocaleLowerCase();

      if (command === 'gif') {
        logger.info('command received');
        const gif = await searchRandomGIF('nicolas cage');

        bot.sendMessage({
          to: channelID,
          message: gif.url,
        });
      } else if (command === 'chewbacca') {
        const gif = await searchRandomGIF('chewbacca');

        bot.sendMessage({
          to: channelID,
          message: gif.url,
        });
      }
    } catch (error) {
      logger.error(error);
    }
  });
};

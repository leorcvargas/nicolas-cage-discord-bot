import Discord from 'discord.io';

import logger from '../utils/logger';
import giphy from '../giphy';
import config from '../config';

export const initBot = () => {
  const prefix = '!nc';
  const bot = new Discord.Client({
    token: config.discordToken,
    autorun: true,
  });

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
        const gif = await giphy.getRandomGIF('nicolas cage');

        bot.sendMessage({
          to: channelID,
          message: gif.url,
        });
      } else if (command === 'chewbacca') {
        const gif = await giphy.getRandomGIF('chewbacca');

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

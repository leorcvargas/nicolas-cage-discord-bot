require('dotenv').config();
const Discord = require('discord.io');

const logger = require('./logger');
const giphy = require('./giphy');

const bot = new Discord.Client({
  token: process.env.DISCORD_TOKEN,
  autorun: true,
});

bot.on('ready', () => {
  logger.info(`Connected ${bot.username} - ${bot.id}`);
});


bot.on('message', (user, userID, channelID, message) => {
  if (message === '!nicolascage' || message === '!nc') {
    logger.info('command received');
    giphy.getRandomGIF('nicolas cage')
      .then((gif) => {
        bot.sendMessage({
          to: channelID,
          message: gif,
        });
      })
      .catch((error) => logger.error(error));
  }
});

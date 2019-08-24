require('dotenv').config();
const express = require('express');
const Discord = require('discord.io');

const app = express();
const logger = require('./logger');
const giphy = require('./giphy');

const initBot = () => {
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
            message: gif.url,
          });
        })
        .catch((error) => logger.error(error));
    }
  });
};

const initServer = () => {
  app.get('/ping', async (req, res) => res.send('Pong!'));

  app.listen(process.env.PORT || 3000, () => {
    logger.info('Nicolas Cage Bot server running');
  });
};

initBot();
initServer();

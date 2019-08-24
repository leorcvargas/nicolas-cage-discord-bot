const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');

logger.add(new logger.transports.Console(), {
  colorize: true,
  level: 'debug',
});

const bot = new Discord.Client({
  token: auth.token,
  autorun: true,
});

bot.on('ready', () => {
  logger.info(`Connected ${bot.username} - ${bot.id}`);
});


bot.on('message', (user, userID, channelID, message) => {
  logger.info(message);
  if (message === '!nicolascage' || message === '!nc') {
    bot.sendMessage({
      to: channelID,
      message: 'I\'m the best actor alive',
    });
  }
});

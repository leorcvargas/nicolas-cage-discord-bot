const Discord = require('discord.io');
const puppeteer = require('puppeteer');

const logger = require('./logger');
const giphy = require('./giphy');

const takeScreenshotFromStock = async (stock) => {
  logger.info(`taking screenshot from stock ${stock}`);
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(`https://www.google.com/search?q=stock+${stock}`);
  const screentshot = await page.screenshot();

  await browser.close();

  return screentshot;
};

const initBot = () => {
  const prefix = '!nc';
  const bot = new Discord.Client({
    token: process.env.DISCORD_TOKEN,
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
      } else if (command === 'stock') {
        if (!args.length) {
          bot.sendMessage({
            to: channelID,
            message: 'How to use: !nc stock <ACTION>',
          });
        }

        const screenshot = await takeScreenshotFromStock(args[0]);
        bot.uploadFile({
          to: channelID,
          file: screenshot,
          filename: 'stock.png',
        }, (error, response) => {
          if (error) {
            logger.error(error);
          }

          logger.info(response);
        });
      }
    } catch (error) {
      logger.info(error);
    }
  });
};

module.exports = { initBot };

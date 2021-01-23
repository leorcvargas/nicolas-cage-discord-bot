import Discord from 'discord.js';
import R from 'ramda';

import logger from '../utils/logger';
import config from '../config';
import { getCommandHandler } from './commands';
import parseCommand from './commands/parseCommand';

const createBotClient = () => new Discord.Client();

const handleReady = () => {
  logger.info('Connected to Discord server');
};

const handleMessage = async (message) => {
  const { content } = message;

  try {
    const parsedCommand = parseCommand(content);

    if (!parsedCommand) return;

    const [command, args] = parsedCommand;

    const commandHandler = getCommandHandler(command);

    await commandHandler(message, args);
  } catch (error) {
    logger.error(error);
  }
};

const attachReadyHandler = (bot) => {
  bot.on('ready', handleReady);

  return bot;
};

const attachMessageHandler = (bot) => {
  bot.on('message', handleMessage);

  return bot;
};

const createBot = R.pipe(
  createBotClient,
  attachReadyHandler,
  attachMessageHandler,
);

export const startBot = () => {
  const bot = createBot();
  bot.login(config.discordToken);
};

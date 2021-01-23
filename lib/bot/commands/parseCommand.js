const commandPrefix = '!nc';

const parseCommand = (message) => {
  const words = message.trim().split(' ');

  const [prefix, command, ...args] = words;

  if (prefix !== commandPrefix) {
    return null;
  }

  return [command, args];
};

export default parseCommand;

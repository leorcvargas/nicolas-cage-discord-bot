const { searchRandomGIF } = require('../../../giphy');

const handleGIF = async (channel, args = []) => {
  const searchTerm = args.length
    ? args.join(' ')
    : 'nicolas cage';

  const gif = await searchRandomGIF(searchTerm);

  channel.send(gif.url);
};

export default handleGIF;

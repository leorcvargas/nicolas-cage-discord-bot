import { searchRandomGIF } from '../../../giphy';

const handleGIF = async (message, args = []) => {
  const searchTerm = args.length
    ? args.join(' ')
    : 'nicolas cage';

  const gif = await searchRandomGIF(searchTerm);

  message.channel.send(gif.url);
};

export default handleGIF;

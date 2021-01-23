import path from 'path';
import ytdl from 'ytdl-core';

const handleSay = async (message, args = []) => {
  const connection = await message.member.voice.channel.join();

  if (args.length) {
    const [videoLink] = args;
    const dispatcher = connection.play(ytdl(videoLink, { filter: 'audioonly' }));
    dispatcher.on('finish', () => {
      dispatcher.destroy();
      message.member.voice.channel.leave();
    });

    return;
  }

  const audioPath = path.resolve(__dirname, '..', '..', '..', '..', 'assets/sounds/hi_fucking_yeah.mp3');
  const dispatcher = connection.play(audioPath);

  dispatcher.on('finish', () => {
    dispatcher.destroy();
    message.member.voice.channel.leave();
  });
};

export default handleSay;

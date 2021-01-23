import path from 'path';

const handleSay = async (message) => {
  const connection = await message.member.voice.channel.join();

  const audioPath = path.resolve(__dirname, '..', '..', '..', '..', 'assets/sounds/hi_fucking_yeah.mp3');
  const dispatcher = connection.play(audioPath);

  dispatcher.on('finish', () => {
    dispatcher.destroy();
    message.member.voice.channel.leave();
  });
};

export default handleSay;

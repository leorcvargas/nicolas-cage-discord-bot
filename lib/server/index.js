import express from 'express';

import logger from '../utils/logger';

const app = express();

export const startServer = () => {
  app.get('/ping', async (req, res) => res.send('Pong!'));

  app.listen(process.env.PORT || 3000, () => {
    logger.info('Nicolas Cage Bot server running');
  });
};

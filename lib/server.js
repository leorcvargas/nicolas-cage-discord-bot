const express = require('express');

const app = express();
const logger = require('./utils/logger');

const initServer = () => {
  app.get('/ping', async (req, res) => res.send('Pong!'));

  app.listen(process.env.PORT || 3000, () => {
    logger.info('Nicolas Cage Bot server running');
  });
};

module.exports = { initServer };

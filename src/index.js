require('dotenv').config();
const { initBot } = require('./bot');
const { initServer } = require('./server');

initBot();
initServer();

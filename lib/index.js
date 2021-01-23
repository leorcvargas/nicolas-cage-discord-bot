import * as dotenv from 'dotenv';

import { startBot } from './bot';
import { initServer } from './server';

dotenv.config();
startBot();
initServer();

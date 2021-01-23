import * as dotenv from 'dotenv';

import { startBot } from './bot';
import { startServer } from './server';

dotenv.config();
startBot();
startServer();

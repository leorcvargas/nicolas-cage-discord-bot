import * as dotenv from 'dotenv';

import { initBot } from './bot';
import { initServer } from './server';

dotenv.config();
initBot();
initServer();

import express from 'express';

import loadAll from './loaders';
import { setup } from './apiRouter';
import { createError } from './util';

const app = express();

export default app;
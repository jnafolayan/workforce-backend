import express from 'express';

import loadAll from './loaders';
import * as config from './config';
import { createError } from './util';

const app = express();

app.setup = () => {
  return loadAll(app, config);
};

export default app;
import express from 'express';

import loadAll from './loaders';
import { createError } from './util';

const app = express();

app.setup = () => {
  return loadAll();
};

export default app;
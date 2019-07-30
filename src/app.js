import express from 'express';
import { setup } from './apiRouter';

import { createError } from './util';

const app = express();

app.use('/api', setup());

app.use((err, req, res, next) => {
  if (!err.status)
    err = createError(500, 'Internal server error');
  res.status(err.status).json({
    status: err.status,
    message: err.message
  });
});

export default app;
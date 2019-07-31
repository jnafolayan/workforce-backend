import cors from 'cors';
import { setup } from '../apiRouter';

/**
 * Registers all api routes with the express app.
 * @param  {object} config The app config object
 * @return {Promise}
 */
export default function loadRoutes(app, config) {
  return new Promise((resolve, reject) => {
    app.use(cors());
    app.use('/api', setup());

    app.use((err, req, res, next) => {
      // handle internal server errors
      if (!err.status)
        err = createError(500, 'Internal server error');
      res.status(err.status).json({
        status: err.status,
        message: err.message
      });
    });

    resolve();
  });
}
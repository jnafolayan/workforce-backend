import cors from 'cors';
import bodyParser from 'body-parser';
import { setup } from '../apiRouter';
import { createError } from '../util';

/**
 * Registers all api routes with the express app.
 * @param  {object} config The app config object
 * @return {Promise}
 */
export default function loadRoutes(app, config) {
  return new Promise((resolve, reject) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/api', setup());

    app.use((err, req, res, next) => {
      // handle internal server errors
      if (!err.status) {
        console.log(err);
        err = createError(500, 'Internal server error');
      }

      res.status(err.status).json({
        status: err.status,
        message: err.message
      });
    });

    resolve();
  });
}
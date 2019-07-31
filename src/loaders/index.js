import loadMongoose from './mongoose';
import loadRoutes from './routes';

/**
 * Executes all loaders. If an error occurs in one, the whole
 * loading process fails.
 * @param  {object} config The app config object
 * @return {Promise}
 */
export default function loadAll(app, config) {
  return Promise.all([
    loadMongoose(app, config),
    loadRoutes(app, config)
  ]);
}
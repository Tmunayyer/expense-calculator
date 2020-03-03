const { authRoutes } = require('./auth.js');
const datastore = require('./datastore.js');

const api = {
  endpoint: '/api/user',

  // =================

  get: async (req, res) => {
    if (!req.session || !req.session.app_id) {
      res.send({ message: 'failed', data: null });
      return;
    }

    const user = await datastore.User.getUser(req.session.app_id);

    res.send({ message: 'success', data: user });
  },

  // =================

  post: false,

  // =================

  put: false,

  // =================

  remove: false
};

const routes = [...authRoutes, api];

/**
 * Takes in the express app obect and configures the handlers to
 *  the attached endpoint.
 *
 * @param {object} app
 */
const configureRoutes = (app) => {
  routes.forEach((route) => {
    const { endpoint, get, post, put, remove } = route;

    if (get) app.get(endpoint, get);
    if (post) app.post(endpoint, post);
    if (put) app.put(endpoint, put);
    if (remove) app.delete(endpoint, remove);
  });
};

module.exports = configureRoutes;

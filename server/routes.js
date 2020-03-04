const { authRoutes } = require('./auth.js');
const datastore = require('./datastore.js');

const api = [
  {
    // =================
    /** */ endpoint: '/api/user',
    // =================
    get: async (req, res) => {
      if (!req.session || !req.session.app_id) {
        res.send({ message: 'failed', data: null });
        return;
      }

      const user = await datastore.User.getUser(req.session.app_id);

      if (!user) {
        res.send({ message: 'no user' });
        return;
      }

      res.send({ message: 'success', data: user });
    }
  },

  {
    // =================
    /** */ endpoint: '/api/calculator-data',
    // =================
    get: async (req, res) => {
      try {
        const userId = req.session.app_id;

        const data = await datastore.Calculator.getData(userId);

        if (!data) {
          res.send({ message: 'no data' });
          return;
        }

        res.send({ message: 'success', data: data });
      } catch (err) {
        console.log('ERROR: from get api/calculator-data...', err);
      }
    },
    post: async (req, res) => {
      try {
        const { slider: election, salary } = req.query;
        const userId = req.session.app_id;

        await datastore.Calculator.upsertData({ userId, election, salary });

        res.send({ message: 'success' });
      } catch (err) {
        console.log('ERROR: from post api/calculator-data...\n', err);
      }
    }
  }
];

const routes = [...authRoutes, ...api];

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

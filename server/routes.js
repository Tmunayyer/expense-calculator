const { authRoutes } = require('./auth.js');

// const api_twits = {
//   endpoint: '/api/twits',

//   // =================

//   get: (req, res) => {},

//   // =================

//   post: (req, res) => {},

//   // =================

//   put: (req, res) => {},

//   // =================

//   remove: (req, res) => {}
// };

const routes = [...authRoutes];

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

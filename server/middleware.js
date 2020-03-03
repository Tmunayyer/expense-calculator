const express = require('express');

// static files
const express_static = express.static('public');

/**
 *
 *
 *
 *
 */

const middleware = [express_static];

const configureMiddleware = (app) => {
  middleware.forEach((elem) => {
    app.use(elem);
  });

  return app;
};

module.exports = configureMiddleware;

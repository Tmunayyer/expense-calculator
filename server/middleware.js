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
  middleware.forEach((_) => {
    app.use(_);
  });

  return app;
};

module.exports = configureMiddleware;

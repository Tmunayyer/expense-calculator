// central location for middleware to be applied to the express app.

const express = require('express');
const pool = require('../database/connect').pool();

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

// sessions
const express_sessions = session({
  store: new pgSession({
    pool: pool, // Connection pool
    tableName: 'session' // Use another table-name than the default "session" one
  }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
});

// static files
const express_static = express.static('public');

/**
 *
 *
 *
 *
 */

const middleware = [express_static, express_sessions];

const configureMiddleware = (app) => {
  middleware.forEach((elem) => {
    app.use(elem);
  });

  return app;
};

module.exports = configureMiddleware;

const express = require('express');

const configureMiddleware = require('./server/middleware.js');
const configureRoutes = require('./server/routes.js');

const PORT = process.env.PORT || 3000;

// create the app
const app = express();

// apply middleware
configureMiddleware(app);

// attach routes to the express application
configureRoutes(app);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

const google = require('./utility/google');
const datastore = require('./datastore.js');

const handleInternalServerError = (res) => {
  res.send('error');
};

const authRoutes = [
  {
    // =================
    /** */ endpoint: '/google/signin',
    // =================
    get: async (req, res) => {
      const URI = await google.getAuthURI();

      res.redirect(URI);
    }
  },
  {
    // =================
    /** */ endpoint: '/google/redirect',
    // =================
    get: async (req, res) => {
      const { code } = req.query;

      try {
        const token = await google.generateToken(code);

        const { data } = await google.getUserInfo(token);

        // create the user in the DB
        const userData = await datastore.User.insertUser({
          fullName: data.name,
          firstName: data.given_name,
          lastName: data.family_name
        });

        // save the user id to the session
        req.session.app_id = userData.id;
        req.session.save(() => {
          // response
          res.redirect('/');
        });
      } catch (err) {
        handleInternalServerError(res);
      }
    }
  }
];

module.exports = {
  authRoutes: authRoutes
};

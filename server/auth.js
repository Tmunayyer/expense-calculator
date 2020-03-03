const google = require('./utility/google');

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

        res.send(data);
      } catch (err) {
        handleInternalServerError(res);
      }
    }
  }
];

module.exports = {
  authRoutes: authRoutes
};

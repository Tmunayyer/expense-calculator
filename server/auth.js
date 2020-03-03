const google = require('./utility/google');

const handleInternalServerError = (res) => {
  res.send('error');
};

const authRoutes = [
  {
    // =================
    /** */ endpoint: '/google/signin',
    // =================

    get: (req, res) => {
      google.getAuthURI((uri) => {
        res.redirect(uri);
      });
    }
  },
  {
    // =================
    /** */ endpoint: '/google/redirect',
    // =================
    get: (req, res) => {
      const { code } = req.query;

      //generate a token
      google.generateToken(code, (err, token) => {
        if (err) {
          console.log('Error generating a token:', err);
          return handleInternalServerError(res);
        }

        //retrieve google's id for user
        google.getUserInfo(token, (err, { data }) => {
          if (err) {
            console.log('Error getting user info from Google:', err);
            return handleInternalServerError(res);
          }

          console.log('the data:', data);
          res.send(data);

          //save user to DB
          //   pg.saveUser(data.id, token.access_token, req.sessionID, (err) => {
          //     if (err) {
          //       console.log('Error saving data to DB', err);
          //       return handleInternalServerError(res);
          //     }

          //     res.redirect('/');
          //   });
        });
      });
    }
  }
];

module.exports = {
  authRoutes: authRoutes
};

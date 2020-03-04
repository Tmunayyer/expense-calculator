// define and export all endpoints required for auth workflows to centralize the logic

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
    get: handleGoogleSignin
  },
  {
    // =================
    /** */ endpoint: '/google/redirect',
    // =================
    get: recieveGoogleRedirect
  }
];

async function handleGoogleSignin(req, res) {
  const URI = await google.getAuthURI();

  res.redirect(URI);
}

async function recieveGoogleRedirect(req, res) {
  const { code } = req.query;

  try {
    const token = await google.generateToken(code);

    const { data } = await google.getUserInfo(token);

    // create the user in the DB
    const userData = await datastore.User.insertUser({
      googleId: data.id,
      avatar: data.picture,
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

module.exports = {
  authRoutes: authRoutes
};

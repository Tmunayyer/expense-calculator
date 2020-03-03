const { google } = require('googleapis');

const SCOPES = ['profile'];

const makeOAuth2Client = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    process.env.GOOGLE_REDIRECT
  );
};

// to be module.exports...
const helpers = {};

helpers.generateToken = (code, cb) => {
  const oAuth2Client = makeOAuth2Client();

  oAuth2Client.getToken(code, (err, token) => {
    cb(err, token);
  });
};

helpers.getAuthURI = (cb) => {
  const oAuth2Client = makeOAuth2Client();

  const authURI = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  cb(authURI);
};

helpers.getUserInfo = (token, cb) => {
  let oAuth2Client = makeOAuth2Client();

  oAuth2Client.setCredentials(token);

  let withAuth = google.oauth2({
    auth: oAuth2Client,
    version: 'v2'
  });

  withAuth.userinfo.v2.me.get((err, data) => {
    if (err) {
      return cb(err, data);
    }

    cb(null, data);
  });
};

module.exports = helpers;

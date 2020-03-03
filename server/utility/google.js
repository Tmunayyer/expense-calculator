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
  return new Promise((accept, reject) => {
    const oAuth2Client = makeOAuth2Client();

    oAuth2Client.getToken(code, (err, token) => {
      if (err) return reject(err);

      accept(token);
    });
  });
};

helpers.getAuthURI = (cb) => {
  /**
   * pretty sure they are just formatting a string for us here
   *  wchich is why there is no call back needed and no use of
   *  reject
   */
  return new Promise((accept, reject) => {
    const oAuth2Client = makeOAuth2Client();

    const authURI = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });

    accept(authURI);
  });
};

helpers.getUserInfo = (token, cb) => {
  return new Promise((accept, reject) => {
    let oAuth2Client = makeOAuth2Client();

    oAuth2Client.setCredentials(token);

    let withAuth = google.oauth2({
      auth: oAuth2Client,
      version: 'v2'
    });

    withAuth.userinfo.v2.me.get((err, data) => {
      if (err) {
        return reject(err);
      }

      accept(data);
    });
  });
};

module.exports = helpers;

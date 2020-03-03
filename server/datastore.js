// an singular location to define and organize simple queries needed by the application

const { query } = require('../database/query.js');

// to be module.exports
const datastore = {};

/**
 * the user branch will define most functionality needed concerning
 *  the user table.
 */
datastore.User = {
  getUser: (userId) => {
    const selectUser = `
        select
            *
        from user
        where id = $1;
    `;
    const params = [userId];

    const result = query(null, selectUser, params);

    console.log('the result:', result);
  },
  insertUser: async (gUserData) => {
    try {
      const { fullName, firstName, lastName } = gUserData;

      const insertUser = `
        insert into user set
            full_name = $1,
            first_name = $2,
            last_name = $3
        returning *
    `;

      const params = [fullName, firstName, lastName];

      console.log('before query:');
      const result = await query(null, insertUser, params);

      console.log('the result:', result);
    } catch (err) {
      console.log('ERROR: inserting the user...', err);
    }
  }
};

module.exports = datastore;

// an singular location to define and organize simple queries needed by the application

const { query } = require('../database/query.js');

// to be module.exports
const datastore = {};

/**
 * the user branch will define most functionality needed concerning
 *  the user table.
 */
datastore.User = {
  getUser: async (userId) => {
    const selectUser = `
        select
            *
        from "user"
        where id = $1;
    `;
    const params = [userId];

    const result = await query(null, selectUser, params);

    return result[0];
  },
  insertUser: async (gUserData) => {
    try {
      const { fullName, firstName, lastName } = gUserData;

      const insertUser = `
        insert into "user"
            (full_name, first_name, last_name)
        values
            ($1, $2, $3)
        returning *
    `;

      const params = [fullName, firstName, lastName];

      const result = await query(null, insertUser, params);

      return result[0];
    } catch (err) {
      console.log('ERROR: inserting the user...', err);
    }
  }
};

module.exports = datastore;

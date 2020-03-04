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
            id,
            full_name,
            first_name,
            last_name,
            avatar
        from "user"
        where id = $1;
    `;
    const params = [userId];

    const result = await query(null, selectUser, params);

    return result[0];
  },
  insertUser: async (gUserData) => {
    try {
      const { googleId, fullName, firstName, lastName, avatar } = gUserData;

      const insertUser = `
        insert into "user"
            (google_id, full_name, first_name, last_name, avatar)
        values
            ($1, $2, $3, $4, $5)
        on conflict ( google_id ) do
        update set
          full_name = excluded.full_name,
          first_name = excluded.first_name,
          last_name = excluded.last_name,
          avatar = excluded.avatar
        returning *
    `;

      const params = [googleId, fullName, firstName, lastName, avatar];

      const result = await query(null, insertUser, params);

      return result[0];
    } catch (err) {
      console.log('ERROR: inserting the user...', err);
    }
  }
};

datastore.Calculator = {
  getData: async (userId) => {
    const selectData = `
      select 
        election, 
        salary 
      from calculator
      where user_id = $1      
    `;
    const params = [userId];

    const result = await query(null, selectData, params);

    return result[0];
  },
  upsertData: async (data) => {
    const { userId, election, salary } = data;

    const insertData = `
        insert into calculator
            (user_id, election, salary)
        values
            ($1, $2, $3)
        on conflict (user_id) do
        update set
          election = excluded.election,
          salary = excluded.salary
        returning *;
    `;
    const params = [userId, election, salary];

    const result = await query(null, insertData, params);

    return result[0];
  }
};

module.exports = datastore;

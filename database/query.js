// some functions to reduce boiler plate code to talk to the database

const pool = require('./connect.js').pool();

/**
 * export this incase we want to implement transactions
 *  for long, many db call workflows
 */
const getClient = async () => {
  try {
    const client = await pool.connect();

    return client;
  } catch (err) {
    console.log('ERROR: getting client...', err);
  }
};

/**
 * Takes in an optional client, required statement, and required params
 *  and performs the query.
 *
 * NOTE: if a client is passed, it is assumed this query is part of a
 *  transaction and will not be released.
 *
 * @param {object} client
 * @param {string} statement
 * @param {array} params
 */
const query = async (client, statement, params) => {
  let localClient = client;
  let shouldRelease = false;
  try {
    if (!localClient) {
      localClient = await getClient();
      shouldRelease = true;
    }

    const result = await localClient.query(statement, params);

    return result.rows;
  } catch (err) {
    console.log('ERROR: from the query function...', err);
  } finally {
    if (shouldRelease) {
      localClient.release();
    }
  }
};

module.exports = {
  getClient,
  query
};

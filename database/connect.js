// creates and exports the postgres pool using environment variables set in .env

const { Pool } = require('pg');

const pool = new Pool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;

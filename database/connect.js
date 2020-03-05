// creates and exports the postgres pool using environment variables set in .env

const { Pool } = require('pg');
const fs = require('fs');

let pool;

const init = (cb) => {
  if (process.env.MODE === 'development') {
    pool = new Pool();

    cb();
  } else {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true
    });

    const text = fs.readFileSync('./database/init.sql').toString();

    pool.connect((err, client) => {
      if (err) {
        throw new Error(err);
      }
      client.query(text, (err, data) => {
        if (err) {
          throw new Error(err);
        }

        client.release();
        cb();
      });
    });
  }

  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });
};

module.exports = { pool: () => pool, poolInit: init };

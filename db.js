const { Pool } = require("pg");

const pool = new Pool({
  // user: "postgres",
  // host: "containers-us-west-172.railway.app",
  // database: "railway",
  // password: "pmlDl6loTj5i4kDACFly",
  // port: 6259,
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = pool;

const { Pool } = require("pg");

const pool = new Pool({
  host: "db",
  port: 5432,
  user: "user",
  password: "pass",
  database: "mydb",
});

module.exports = pool;

// Requiring the pg module
const Pool = require("pg").Pool;
// Creating a new pool
const pool = new Pool({
  // Setting the user to postgres
  user: "postgres",
  // Setting the host to localhost
  host: "localhost",
  // Setting the database to QAP4
  database: "QAP4",
  // Setting the password
  password: "New10Bill",
  // Setting the port to 5432
  port: 5432,
});
// Exporting the pool
module.exports = pool;

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "QAP4",
  password: "New10Bill",
  port: 5432,
});
module.exports = pool;

//START IMPORTS
const sql = require("mysql");
//END IMPORTS
// START CONFIG
const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notes",
});
//END CONFIG

module.exports = db;

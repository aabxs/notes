// START IMPORTS
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// END IMPORTS
//START IMPORT DATABASE
const db = require("../db.config");
//END IMPORT DATABASE
// START LOGIN
async function login(req, res) {
  res.setHeader("Content-Type", "application/json");
  const email = req.body.email;
  const pass = req.body.pass;
  if (!email || !pass) {
    res.status(419);
    res.end(
      JSON.stringify(
        { error: "Please enter the required information" },
        null,
        4
      )
    );
  } else {
    db.query(
      "SELECT id, password FROM users WHERE email = ?",
      [email],
      (err, result) => {
        if (result.length) {
          if (bcrypt.compareSync(pass, result[0].password)) {
            session = crypto.randomBytes(36).toString("hex");
            expiry = new Date().getTime() + 10800000;
            userID = result[0].id;
            db.query(
              "INSERT INTO sessions (session, expiry, user) VALUES (?, ?, ?)",
              [session, expiry, userID],
              (err, result) => {
                res.cookie("user", session);
                res.end(
                  JSON.stringify(
                    { success: "Successfully logged in", session: session },
                    null,
                    4
                  )
                );
              }
            );
          } else {
            res.end(JSON.stringify({ error: "Invalid Password" }, null, 4));
          }
        } else {
          res.end(JSON.stringify({ error: "No users found." }, null, 4));
        }
      }
    );
  }
}
// END LOGIN
// START EXPORT
module.exports = login;
// END EXPORT

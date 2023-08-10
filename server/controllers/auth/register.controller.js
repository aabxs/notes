// START IMPORTS
const bcrypt = require("bcrypt");
// END IMPORTS
//START IMPORT DATABASE
const db = require("../db.config");
//END IMPORT DATABASE
// START REGISTER
function validateEmail(email) {
  // Regular expression pattern for validating email
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the pattern
  return pattern.test(email);
}
async function register(req, res) {
  res.setHeader("Content-Type", "application/json");
  const email = req.body.email;
  const pass = req.body.pass;
  const confirmationPass = req.body.confirmationPass;

  if (!email || !pass || !confirmationPass) {
    res.end(
      JSON.stringify(
        { error: "Please enter the required information" },
        null,
        4
      )
    );
  } else if (!validateEmail(email)) {
    res.end(JSON.stringify({ error: "Please enter a valid email" }, null, 4));
  } else if (pass !== confirmationPass) {
    res.end(JSON.stringify({ error: "Passwords do not match" }, null, 4));
  } else {
    const hashedPassword = await bcrypt.hash(pass, 10);
    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword, email],
      (err, result) => {
        console.log(err);
        if (err) {
          res.end(
            JSON.stringify({ error: "Email already registered" }, null, 4)
          );
        } else {
          res.end(
            JSON.stringify(
              { success: "Successfully registered. Redirecting to login page" },
              null,
              4
            )
          );
        }
      }
    );
  }
}
// END REGISTER
// START EXPORT
module.exports = register;
// END EXPORT

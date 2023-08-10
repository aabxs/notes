const bcrypt = require("bcrypt");

const db = require("../db.config");
module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const code = req.body.code;
  const pass = req.body.pass;
  const confirmationPass = req.body.confirmationPass;
  console.log(req.body);
  if (!code || !pass || !confirmationPass) {
    res.end(
      JSON.stringify(
        { error: "Please enter the required information" },
        null,
        4
      )
    );
  } else if (pass !== confirmationPass) {
    res.end(JSON.stringify({ error: "Passwords do not match" }, null, 4));
  } else {
    const hashedPassword = await bcrypt.hash(pass, 10);
    db.query(
      "UPDATE users SET password = ?, resetCode = '' WHERE resetCode = ?",
      [hashedPassword, code],
      (err, result) => {
        console.log(err);
        if (err) {
          res.end(JSON.stringify({ error: "Unexpected Error" }, null, 4));
        } else if (result.affectedRows > 0) {
          res.end(
            JSON.stringify({ success: "Successfully reset password." }, null, 4)
          );
        } else {
          res.end(JSON.stringify({ error: "Invalid Code" }, null, 4));
        }
      }
    );
  }
};

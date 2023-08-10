// START IMPORTS
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
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
async function resetPass(req, res) {
  res.setHeader("Content-Type", "application/json");
  const email = req.body.email;
  const code = crypto.randomBytes(16).toString("hex");
  if (!email) {
    res.end(
      JSON.stringify(
        { error: "Please enter the required information" },
        null,
        4
      )
    );
  } else if (!validateEmail(email)) {
    res.end(JSON.stringify({ error: "Please enter a valid email" }, null, 4));
  } else {
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      (err, result) => {
        console.log(err);
        if (err) {
          res.end(
            JSON.stringify({ error: "Unexpected Error Occured" }, null, 4)
          );
        } else if (!result.length) {
          res.end(JSON.stringify({ error: "Email does not exist" }, null, 4));
        } else {
          db.query(
            "UPDATE users SET resetCode = ? WHERE email = ?",
            [code, email],
            (err, result) => {
              if (err) {
                res.end(
                  JSON.stringify({ error: "Unexpected Error Occured" }, null, 4)
                );
              } else {
                const transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: "studentspark@stup.id",
                    pass: "iummyssljiwefrus",
                  },
                });
                const mailOptions = {
                  from: "studentspark@stup.id",
                  to: email,
                  subject: "Your One Time Password",
                  text: code,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                    res.end(
                      JSON.stringify(
                        { error: "Unexpected Error Occured" },
                        null,
                        4
                      )
                    );
                  } else {
                    console.log("Email sent: " + info.response);
                    res.end(
                      JSON.stringify({ success: "Sent OTP to email." }, null, 4)
                    );
                  }
                });
              }
            }
          );
        }
      }
    );
  }
}
// END REGISTER
// START EXPORT
module.exports = resetPass;
// END EXPORT

// START IMPORTS
const express = require("express");
const cookie = require("cookie-parser");
const cors = require("cors");
const mysql = require("mysql");
var cron = require("node-cron");
const db = require("./controllers/db.config");
const nodemailer = require("nodemailer");

//END IMPORTS

// START CONFIG
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//END CONFIG
// START MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cron.schedule("* * * * *", () => {
  db.query(
    "SELECT notifications.id AS nid, email, targets.target AS target FROM notifications JOIN targets ON notifications.target = targets.id WHERE date < ?",
    [new Date()],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i < result.length; i++) {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "studentspark@stup.id",
              pass: "iummyssljiwefrus",
            },
          });
          const mailOptions = {
            from: "studentspark@stup.id",
            to: result[i].email,
            subject: "Target Reminder",
            text:
              "This is a reminder for you to complete the following target: " +
              result[i].target,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              db.query(
                "DELETE FROM notifications WHERE id = ?",
                [result[i].nid],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
              console.log("Email sent: " + info.response);
            }
          });
        }
      }
    }
  );
});
//END MIDDLEWARE
//START ROUTES
app.use("/v1", require("./controllers/api"));

//END ROUTES

module.exports = app;

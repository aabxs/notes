const db = require("../db.config");
const validateUser = require("../auth/validate.controller");

module.exports = async (req, res) => {
  const body = req.body;
  res.setHeader("Content-Type", "application/json");
  let valid = validateUser(body.session);
  await valid.then((result) => {
    valid = result;
  });

  console.log(body.target);

  var givenDate = new Date(body.time);
  var currentDate = new Date();

  if (!valid) {
    res.end(JSON.stringify({ error: "Not Authenticated" }, null, 4));
    return;
  } else if (givenDate < currentDate) {
    res.end(
      JSON.stringify({ error: "Please set a valid future date" }, null, 4)
    );
    return;
  }

  db.query(
    "SELECT * FROM notifications WHERE target = ? AND date > ?",
    [body.target, currentDate],
    (err, result) => {
      if (err) {
        res.end(JSON.stringify({ error: "error" }, null, 4));
        console.log(err);
        return;
      } else if (!result.length) {
        db.query(
          "INSERT INTO notifications (target, date, email) VALUES (?, ?, (SELECT email FROM users WHERE id = (SELECT user FROM sessions WHERE session = ?)))",
          [body.target, body.time, body.session],
          (err, result) => {
            if (err) {
              res.end(JSON.stringify({ error: "error" }, null, 4));
              console.log(err);
              return;
            } else {
              res.end(
                JSON.stringify(
                  { success: "Successfully set notification for " + body.time },
                  null,
                  4
                )
              );
            }
          }
        );
      } else {
        res.end(
          JSON.stringify(
            { error: "Notification already set for this target" },
            null,
            4
          )
        );
      }
    }
  );
};

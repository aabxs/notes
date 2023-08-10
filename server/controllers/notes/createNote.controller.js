const db = require("../db.config");
const validateUser = require("../auth/validate.controller");

module.exports = async (req, res) => {
  const body = req.body;
  res.setHeader("Content-Type", "application/json");
  let valid = validateUser(body.session);
  await valid.then((result) => {
    valid = result;
  });

  if (!valid) {
    res.end(JSON.stringify({ error: "Not Authenticated" }, null, 4));
    return;
  }

  db.query(
    "INSERT INTO notes (note, title, user) VALUES (?, ?, (SELECT user FROM sessions WHERE session = ?))",
    [body.note, body.title, body.session],
    (err, result) => {
      if (err) {
        res.end(JSON.stringify({ error: "error" }, null, 4));
        return;
      }

      const noteID = result.insertId; // Get the generated primary key

      let insertCounter = 0;
      const expectedInserts = body.targets.length;

      // Loop through the targets and insert them
      if (body.targets.length > 0) {
        for (let i = 0; i < body.targets.length; i++) {
          db.query(
            "INSERT INTO targets (noteID, target, complete) VALUES (?, ?, ?)",
            [noteID, body.targets[i], body.completes[i]],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                insertCounter++;
                if (insertCounter === expectedInserts) {
                  console.log("All inserts completed");
                  res.end(JSON.stringify({ success: "success" }, null, 4));
                }
              }
            }
          );
        }
      } else {
        res.end(JSON.stringify({ success: "success" }, null, 4));
      }
    }
  );
};

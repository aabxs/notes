const db = require("../db.config");
const validateUser = require("../auth/validate.controller");

module.exports = async (req, res) => {
  body = req.body;
  res.setHeader("Content-Type", "application/json");
  let valid = validateUser(body.session);
  await valid.then((result) => {
    valid = result;
  });

  if (!valid) {
    res.end(JSON.stringify({ error: "Not Authenticated" }, null, 4));
    return;
  }

  for (let i = 0; i < body.targets.length; i++) {
    db.query(
      "INSERT INTO targets(id, noteID, target, complete) VALUES (?,?, ?, ?) ON DUPLICATE KEY UPDATE target = ?, complete = ?",
      [
        body.targetIDs[i],
        body.id,
        body.targets[i],
        body.completes[i],
        body.targets[i],
        body.completes[i],
      ],
      (err, result) => {
        if (err) {
          res.end(JSON.stringify({ error: "error" }, null, 4));
          return;
        }
      }
    );
  }
  db.query(
    "UPDATE notes SET note = ?, title = ? WHERE id = ? AND user = (SELECT user FROM sessions WHERE session = ?)",
    [body.note, body.title, body.id, body.session]
  );
  res.end(JSON.stringify({ success: "Saved Changes" }, null, 4));
};

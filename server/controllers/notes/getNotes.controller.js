const db = require("../db.config");

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.query(
    `
    SELECT n.id, n.title, n.note, n.lastEdit, t.id as targetID, t.target, t.complete
    FROM notes n
    LEFT JOIN targets t ON n.id = t.noteID WHERE user = (SELECT user FROM sessions WHERE session = ?) ORDER BY n.lastEdit DESC
    `,
    [req.body.session],
    (err, result) => {
      if (err) {
        res.end(
          JSON.stringify({ error: "Unexpected Error Occurred" }, null, 4)
        );
      } else {
        const notes = [];
        result.forEach((row) => {
          let note = notes.find((item) => item.id === row.id);
          if (row.targetID) {
            if (note) {
              note.targets.push({
                id: row.targetID,
                target: row.target,
                complete: row.complete,
              });
            } else {
              note = {
                id: row.id,
                title: row.title,
                note: row.note,
                lastEdit: row.lastEdit,
                targets: [
                  {
                    id: row.targetID,
                    target: row.target,
                    complete: row.complete,
                  },
                ],
              };
              notes.push(note);
            }
          } else {
            note = {
              id: row.id,
              title: row.title,
              note: row.note,
              lastEdit: row.lastEdit,
              targets: [],
            };
            notes.push(note);
          }
        });
        res.end(JSON.stringify(notes, null, 4));
      }
    }
  );
};

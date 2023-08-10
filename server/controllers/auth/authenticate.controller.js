//START IMPORTS
const db = require("../db.config");
//END IMPORTS

module.exports = async (req, res) => {
  user = req.body.session;

  res.setHeader("Content-Type", "application/json");
  let isUser = user === undefined;
  if (isUser) {
    res.end(JSON.stringify({ error: "Not Authenticated" }, null, 4));
  } else {
    let auth = new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM sessions WHERE session = ? AND expiry > ?",
        [user, new Date().getTime() / 1000],
        (err, result) => {
          return err ? reject(err) : resolve(result);
        }
      );
    });
    await auth.then((result) => {
      auth = result;
    });
    if (auth.length) {
      res.end(JSON.stringify({ success: "Authenticated" }, null, 4));
    } else {
      res.end(JSON.stringify({ error: "Not Authenticated" }, null, 4));
    }
  }
};

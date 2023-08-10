//START IMPORTS
const db = require("../db.config");
//END IMPORTS

module.exports = async (session) => {
  let isUser = session === undefined;
  if (isUser) {
    return false;
  } else {
    let auth = new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM sessions WHERE session = ? AND expiry > ?",
        [session, new Date().getTime() / 1000],
        (err, result) => {
          return err ? reject(err) : resolve(result);
        }
      );
    });
    await auth.then((result) => {
      auth = result;
    });
    if (auth.length) {
      return true;
    } else {
      return false;
    }
  }
};

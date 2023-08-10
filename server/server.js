//START IMPORTS
const http = require("http");
const app = require("./app");
//END IMPROTS
//START CONFIG
const PORT = 3000;
async function startServer() {
  http.createServer(app).listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}
//END CONFIG

startServer();

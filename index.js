const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/db/connectDB");
const server = http.createServer(app);
require("dotenv").config();
const port = process.env.PORT || 5000;
const main = async () => {
  await connectDB();
  server.listen(port, () => {
    console.log(`Vibe It Server is listening on port ${port}`);
  });
};
main();

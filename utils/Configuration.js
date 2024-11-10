let dotenv = require("dotenv");
dotenv.config({ path: __dirname + `../.env${process.env.NODE_ENV}` });

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
let config = {};
if (process.env.NODE_ENV === "production") {
  config = {
    port: 4010,
    mongo_db: process.env.mongo_db,
  };
} else {
  config = {
    port: process.env.port,
    mongo_db: process.env.mongo_db,
  };
}

module.exports = config;

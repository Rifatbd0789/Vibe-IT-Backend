const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  console.log("connecting to database");
  const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pkfg2gw.mongodb.net/?retryWrites=true&w=majority`;

  await mongoose.connect(mongoURI, { dbName: process.env.DB_NAME });
  console.log("connected to database");
};

module.exports = connectDB;

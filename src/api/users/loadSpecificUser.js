const userCollection = require("../../models/UserModel");
const mongoose = require("mongoose");

const loadSpecificUser = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new mongoose.Types.ObjectId(id) };
  const result = await userCollection.findOne(filter);
  res.send(result);
};
module.exports = loadSpecificUser;

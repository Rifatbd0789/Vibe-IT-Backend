const userCollection = require("../../models/UserModel");

const loadAllUser = async (req, res) => {
  const filter = { role: "Employee" };
  const result = await userCollection.find(filter).exec();
  res.send(result);
};
module.exports = loadAllUser;

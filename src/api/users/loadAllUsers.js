const userCollection = require("../../models/UserModel");

const loadAllUsers = async (req, res) => {
  const roleToMatch = ["Employee", "HR"];
  const filter = { role: { $in: roleToMatch }, Verified: true };
  const result = await userCollection.find(filter).exec();
  res.send(result);
};
module.exports = loadAllUsers;

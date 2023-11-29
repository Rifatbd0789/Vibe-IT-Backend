const userCollection = require("../../models/UserModel");

const getTheNameEmployee = async (req, res) => {
  const filter = { role: "Employee" };
  const result = await userCollection.find(filter, { name: 1 }).exec();
  res.send(result);
};
module.exports = getTheNameEmployee;

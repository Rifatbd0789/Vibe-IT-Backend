const userCollection = require("../../models/UserModel");

const createUser = async (req, res) => {
  const user = req.body;
  const result = await userCollection.create(user);
  res.send(result);
};
module.exports = createUser;

const userCollection = require("../../models/UserModel");

const checkUserFire = async (req, res) => {
  const email = req.params.email;
  const filter = { email: email };
  const result = await userCollection.findOne(filter);
  res.send(result);
};
module.exports = checkUserFire;

const userCollection = require("../../models/UserModel");

const verifyEmployee = async (req, res) => {
  const email = req.params.email;
  const filter = { email: email };
  const user = await userCollection.findOne(filter);
  const newValue = !user?.Verified;
  const updateDoc = {
    $set: {
      Verified: newValue,
    },
  };
  const result = await userCollection.findOneAndUpdate(filter, updateDoc, {
    new: true,
  });
  res.send(result);
};
module.exports = verifyEmployee;

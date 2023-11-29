const userCollection = require("../../models/UserModel");

const fireUser = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const updateDoc = {
    $set: {
      fire: true,
    },
  };
  const result = await userCollection.updateOne(query, updateDoc);
  res.send(result);
};
module.exports = fireUser;

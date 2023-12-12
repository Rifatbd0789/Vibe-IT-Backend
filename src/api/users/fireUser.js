const userCollection = require("../../models/UserModel");

const fireUser = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const result = await userCollection.findOne(query);
  if (result.fire) {
    const updateDoc = {
      $set: {
        fire: false,
      },
    };
    const result2 = await userCollection.updateOne(query, updateDoc);
    res.send(result2);
  }
  if (!result.fire) {
    const updateDoc = {
      $set: {
        fire: true,
      },
    };
    const result2 = await userCollection.updateOne(query, updateDoc);
    res.send(result2);
  }
};
module.exports = fireUser;

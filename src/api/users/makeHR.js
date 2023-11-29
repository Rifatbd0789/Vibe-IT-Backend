const userCollection = require("../../models/UserModel");

const makeHR = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const updateDoc = {
    $set: {
      role: "HR",
    },
  };
  const result = await userCollection.updateOne(query, updateDoc);
  res.send(result);
};
module.exports = makeHR;

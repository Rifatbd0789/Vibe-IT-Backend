const userCollection = require("../../models/UserModel");

const makeHR = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const result = await userCollection.findOne(query);
  if (result.role === "Employee") {
    const updateDoc = {
      $set: {
        role: "HR",
      },
    };
    const result2 = await userCollection.updateOne(query, updateDoc);
    res.send(result2);
  }
  if (result.role === "HR") {
    const updateDoc = {
      $set: {
        role: "Employee",
      },
    };
    const result2 = await userCollection.updateOne(query, updateDoc);
    res.send(result2);
  }
};
module.exports = makeHR;

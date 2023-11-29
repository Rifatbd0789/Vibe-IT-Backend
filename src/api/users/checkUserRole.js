const userCollection = require("../../models/UserModel");

const checkUserRole = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  if (user?.role === "Admin") {
    res.send({ user: "Admin" });
  }
  if (user?.role === "HR") {
    res.send({ user: "HR" });
  }
  if (user?.role === "Employee") {
    res.send({ user: "Employee" });
  }
};
module.exports = checkUserRole;

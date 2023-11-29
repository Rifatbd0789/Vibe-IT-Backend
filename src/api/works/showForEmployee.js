const worksCollection = require("../../models/WorkModel");

const showForEmployee = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };

  const result = await worksCollection
    .find(query)
    .sort({ timeStamp: -1 })
    .exec();
  res.send(result);
};
module.exports = showForEmployee;

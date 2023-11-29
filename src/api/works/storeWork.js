const worksCollection = require("../../models/WorkModel");

const storeWork = async (req, res) => {
  const sheet = req.body;
  const result = await worksCollection.create(sheet);
  res.send(result);
};
module.exports = storeWork;

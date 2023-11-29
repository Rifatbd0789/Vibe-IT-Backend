const worksCollection = require("../../models/WorkModel");

const showAllData = async (req, res) => {
  const name = req.query.name;
  let query = {};
  if (name === "search") {
    const result = await worksCollection.find().exec();
    res.send(result);
    return;
  }
  query = { name: name };
  const result = await worksCollection.find(query).exec();
  res.send(result);
};
module.exports = showAllData;

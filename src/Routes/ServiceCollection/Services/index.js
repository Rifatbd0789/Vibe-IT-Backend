const router = require("express").Router();
const serviceCollection = require("../../../models/ServiceModel");
router.get("/services", async (req, res) => {
  const result = await serviceCollection.find().exec();
  res.send(result);
});

module.exports = router;

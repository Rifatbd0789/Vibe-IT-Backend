const paymentCollection = require("../../models/PaymentModel");

const showPayData = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };

  const result = await paymentCollection.find(query).sort({ time: -1 }).exec();
  res.send(result);
};
module.exports = showPayData;

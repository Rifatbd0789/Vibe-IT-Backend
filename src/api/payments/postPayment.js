const paymentCollection = require("../../models/PaymentModel");

const postPayment = async (req, res) => {
  const payment = req.body;
  const paymentResult = await paymentCollection.create(payment);
  res.send(paymentResult);
};
module.exports = postPayment;

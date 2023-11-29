const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();
const stripePayment = async (req, res) => {
  const { salary } = req.body;
  const amount = parseInt(salary);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntent.client_secret });
};
module.exports = stripePayment;

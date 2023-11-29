const mongoose = require("mongoose");
const paymentCollection = require("../../models/PaymentModel");
const userCollection = require("../../models/UserModel");

const chartData = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new mongoose.Types.ObjectId(id) };
  const result = await userCollection.findOne(filter);
  const email = result.email;
  const query = { email: email };

  const result2 = await paymentCollection
    .find(query, { time: 1, salary: 1 })
    .exec();
  res.send(result2);
};
module.exports = chartData;

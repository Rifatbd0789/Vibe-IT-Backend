const { model, Schema } = require("mongoose");

const PaymentSchema = new Schema({
  name: { type: String },
  photo: { type: String },
  designation: { type: String },
  email: { type: String },
  salary: { type: String },
  transectionId: { type: String },
  time: { type: String },
  status: { type: String },
});

const paymentCollection = model("payments", PaymentSchema);

module.exports = paymentCollection;

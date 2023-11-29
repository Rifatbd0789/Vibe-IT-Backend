const { model, Schema } = require("mongoose");

const ServiceSchema = new Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
});

const serviceCollection = model("services", ServiceSchema);

module.exports = serviceCollection;

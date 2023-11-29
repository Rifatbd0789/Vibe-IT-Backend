const { model, Schema } = require("mongoose");

const WorkSchema = new Schema({
  name: { type: String },
  email: { type: String },
  date: { type: String },
  hour: { type: String },
  task: { type: String },
  timeStamp: { type: String },
});

const worksCollection = model("works", WorkSchema);

module.exports = worksCollection;

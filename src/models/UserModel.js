const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String },
  name: { type: String },
  role: { type: String },
  designation: { type: String },
  salary: { type: String },
  bank: { type: String },
  photo: { type: String },
  Verified: { type: Boolean },
  fire: { type: Boolean },
});
const userCollection = model("users", UserSchema);

module.exports = userCollection;

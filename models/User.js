const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user_id: Number,
    uid_key: String,
    name: String,
    address: String,
    motorcycle_brand: String,
    motorcycle_name: String,
    plate_no: String,
    contact_no: String,
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

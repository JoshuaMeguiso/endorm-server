const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    user_id: Number,
    date: Date,
    amount: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("transactions", transactionSchema);

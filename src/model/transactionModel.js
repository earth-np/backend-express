const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "shopping",
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = { Transaction };

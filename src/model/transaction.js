const mongoose = require("mongoose");

const Transaction = new mongoose.Schema({
    description: { type: String },
    amount: { type: Number },
    date: { type: Date },
    type: { type: String }
})

module.exports = mongoose.models.Transaction || mongoose.model("Transaction", Transaction);

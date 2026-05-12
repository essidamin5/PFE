const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,

  offre: {
    title: String,
    price: Number,
    category: String
  },

  status: {
    type: String,
    default: "pending" // 🔥
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Commande", CommandeSchema);
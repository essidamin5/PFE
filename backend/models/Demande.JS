const mongoose = require("mongoose");

const DemandeSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  company: String,
  projectType: String,
  description: String,
  budget: String,
  timeline: String,
  message: String,

  status: {
    type: String,
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Demande", DemandeSchema);
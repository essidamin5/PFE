const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  birthdate: String,

  role: { type: String, default: "user" },

  settings: {
    dark: { type: Boolean, default: false },
    notifications: { type: Boolean, default: true },
    language: { type: String, default: "EN" }
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
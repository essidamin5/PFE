const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* MIDDLEWARE */
app.use(express.json());
app.use(cors());

/* CONNECT DB */
mongoose.connect("mongodb://127.0.0.1:27017/be_carth_ai")
  .then(() => console.log("MongoDB connecté ✅"))
  .catch(err => console.log("Erreur MongoDB ❌:", err));

/* IMPORT MODEL */
const User = require("./models/users");

/* ROUTES */
/* ROUTES */
app.use("/api/settings", require("./routes/settings"));
app.use("/api/Commandes", require("./routes/Commandes"));
app.use("/api/demande", require("./routes/demande")); 
/* REGISTER */
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, birthdate } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing fields ❌" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User exists ❌" });
    }

    const user = new User({ name, email, password, birthdate });
    await user.save();

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* LOGIN */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: "Wrong login ❌" });
    }

  } catch (err) {
    res.status(500).json({ success: false });
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur ❌" });
  }
});


/* TEST */
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

/* START */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});
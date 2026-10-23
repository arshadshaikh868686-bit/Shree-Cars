require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// FRONTEND_URL me comma se multiple URL daal sakte ho. Khali ho to sabko allow.
const origins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((s) => s.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: origins.length ? origins : true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connect nahi hua", error: err.message });
  }
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
// Payment abhi "coming soon" hai (controller bana nahi), isliye route band hai.
// app.use("/api/payment", require("./routes/paymentRoutes"));

app.get("/", (req, res) => res.send("Car Dealer API chal rahi hai"));
app.get("/api", (req, res) => res.json({ ok: true }));

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server port ${PORT} pe chal raha hai`)))
    .catch((err) => console.error("DB error:", err.message));
}

module.exports = app;

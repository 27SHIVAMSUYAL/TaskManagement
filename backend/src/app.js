const express = require("express");
const cors = require("cors");
const app = express();

// 🛡️ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🚀 Routes
app.use("/api/tasks", require("./routes/taskRoutes"));  // Task Routes
app.use("/api/auth", require("./routes/authRoutes"));  // Auth Routes

// ❌ 404 Handler
app.use("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
});

module.exports = app;

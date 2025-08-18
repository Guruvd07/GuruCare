// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

/* ------------------------------------------------------------------ */
/* Paths & App Setup                                                   */
/* ------------------------------------------------------------------ */
const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, "users.json");

/* Ensure users.json exists */
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]", "utf8");
}

/* ------------------------------------------------------------------ */
/* CORS: allow your deployed frontend + localhost in dev               */
/* ------------------------------------------------------------------ */
const isProd = process.env.NODE_ENV === "production";
const envOrigins =
  (process.env.FRONTEND_URL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const allowedOrigins = isProd
  ? envOrigins
  : [...envOrigins, "http://localhost:3000", "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, cb) {
    if (!origin) return cb(null, true); // allow curl / postman
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* ------------------------------------------------------------------ */
/* Parsers                                                            */
/* ------------------------------------------------------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ------------------------------------------------------------------ */
/* Healthcheck                                                         */
/* ------------------------------------------------------------------ */
app.get("/health", (_req, res) => {
  res.json({ status: "OK", service: "Authentication Service" });
});

/* ------------------------------------------------------------------ */
/* Helpers for file-backed users                                       */
/* ------------------------------------------------------------------ */
const readUsers = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    console.log("Users file updated successfully");
  } catch (error) {
    console.error("Error writing users file:", error);
  }
};

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */
app.post("/api/register", (req, res) => {
  console.log("Registration attempt:", req.body);
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const users = readUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "Email already registered." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { fullName, email, password: hashedPassword };
  users.push(newUser);
  writeUsers(users);

  console.log("New user registered:", { email, fullName });
  return res.json({
    message: "User registered successfully",
    user: { fullName, email },
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  return res.json({
    message: "Login successful",
    user: { fullName: user.fullName, email: user.email },
  });
});

/* ------------------------------------------------------------------ */
/* Error handlers                                                      */
/* ------------------------------------------------------------------ */
app.use((err, _req, res, _next) => {
  console.error(err?.message || err);
  const status = err?.message?.startsWith("Not allowed by CORS") ? 403 : 500;
  res.status(status).json({ error: err?.message || "Server error" });
});

/* ------------------------------------------------------------------ */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Authentication Server running on port ${PORT}`);
  console.log("Allowed Origins:", allowedOrigins);
});

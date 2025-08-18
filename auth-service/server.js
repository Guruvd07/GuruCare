import express from "express";
import cors from "cors";

const app = express();

// ✅ Allowed frontend origins (local + deployed)
const allowedOrigins = [
  "https://medical-frontend-oxk9.onrender.com", // Render frontend
  "http://localhost:3000", // React local
  "http://localhost:5173"  // Vite local
];

// ✅ Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// =================== ROUTES ===================

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ message: "Auth Service is running 🚀" });
});

// ✅ Register route
app.post("/api/register", (req, res) => {
  console.log("Registration attempt:", req.body);
  // TODO: Add DB logic here
  res.json({ success: true, message: "User registered successfully" });
});

// ✅ Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", req.body);

  // TODO: Add DB + authentication logic here
  if (email && password) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(400).json({ success: false, message: "Invalid credentials" });
  }
});

// ==============================================

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Auth Service running on port ${PORT}`);
});

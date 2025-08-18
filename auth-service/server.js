import express from "express"
import fs from "fs"
import path from "path"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname } from "path"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const DATA_FILE = path.join(__dirname, "users.json")

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]", "utf8")
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }),
)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "../public")))

app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "Authentication Service" })
})

const readUsers = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading users file:", error)
    return []
  }
}

const writeUsers = (users) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2))
    console.log("Users file updated successfully")
  } catch (error) {
    console.error("Error writing users file:", error)
  }
}

app.post("/api/register", (req, res) => {
  console.log("Registration attempt:", req.body)

  const { fullName, email, password } = req.body

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required." })
  }

  const users = readUsers()
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ error: "Email already registered." })
  }

  const hashedPassword = bcrypt.hashSync(password, 10)
  const newUser = { fullName, email, password: hashedPassword }
  users.push(newUser)
  writeUsers(users)

  console.log("New user registered:", { email, fullName })
  res.json({ message: "User registered successfully", user: { fullName, email } })
})

app.post("/api/login", (req, res) => {
  const { email, password } = req.body

  const users = readUsers()
  const user = users.find((u) => u.email === email)
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password." })
  }

  const isMatch = bcrypt.compareSync(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password." })
  }

  res.json({ message: "Login successful", user: { fullName: user.fullName, email: user.email } })
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Authentication Server running on port ${PORT}`)
})

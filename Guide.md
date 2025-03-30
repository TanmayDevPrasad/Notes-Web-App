# MERN Notes App with Authentication - Step-by-Step Guide

---

## 1. Setup Your Development Environment

### 1.1 Install Node.js & MongoDB
Ensure you have **Node.js** and **MongoDB** installed.

### 1.2 Initialize Backend Project
```sh
mkdir mern-notes-app
cd mern-notes-app
mkdir backend frontend
cd backend
npm init -y
```

### 1.3 Install Backend Dependencies
```sh
npm install express mongoose dotenv cors bcryptjs jsonwebtoken nodemon
```

### 1.4 Setup Server (`backend/server.js`)
```js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
```

### 1.5 Create `.env` File
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server:
```sh
npm install -g nodemon
nodemon server.js
```

---

## 2. Build Authentication System

### 2.1 Create User Model (`backend/models/User.js`)
```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);
```

### 2.2 Create Authentication Routes (`backend/routes/auth.js`)
```js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Sign Up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered!" });
});

// Log In
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token, userId: user._id });
});

export default router;
```

### 2.3 Add Auth Middleware (`backend/middleware/auth.js`)
```js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
```

### 2.4 Protect Routes in `server.js`
```js
import authRoutes from "./routes/auth.js";
app.use("/auth", authRoutes);
```

---

## 3. Build Notes Management System

### 3.1 Create Note Model (`backend/models/Note.js`)
```js
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);
```

### 3.2 Create Notes Routes (`backend/routes/notes.js`)
```js
import express from "express";
import auth from "../middleware/auth.js";
import Note from "../models/Note.js";

const router = express.Router();

// Create Note
router.post("/", auth, async (req, res) => {
  const newNote = new Note({ ...req.body, userId: req.userId });
  await newNote.save();
  res.status(201).json(newNote);
});

// Get User Notes
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
});

export default router;
```

### 3.3 Connect Notes Routes in `server.js`
```js
import noteRoutes from "./routes/notes.js";
app.use("/notes", noteRoutes);
```

---

## 4. Setup Frontend

### 4.1 Initialize React App
```sh
cd ../frontend
npx create-react-app .
npm install axios react-router-dom
```

### 4.2 Setup Routing (`frontend/src/App.js`)
```js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## 5. Run the Project

### 5.1 Start Backend
```sh
cd backend
nodemon server.js
```

### 5.2 Start Frontend
```sh
cd frontend
npm start
```

---

🎉 **You're Done!**  
Now, users can **sign up, log in, and create their own notes** securely. 🚀


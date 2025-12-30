const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../users.json");

// Ensure users.json exists
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]));
}

// REGISTER
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const users = JSON.parse(fs.readFileSync(usersFile));

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    email,
    password, // ⚠️ plain text for now (we’ll hash later)
  };

  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.status(201).json({
    message: "Registration successful",
    user: { id: newUser.id, email: newUser.email },
  });
});

module.exports = router;

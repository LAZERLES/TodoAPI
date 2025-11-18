const User = require("../Models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create a new user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Check if user exists
    const userData = await User.findOne({ where: { username } });
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token with user ID
    const token = jwt.sign(
      { id: userData.id, username: userData.username },
      "secret",
      {
        expiresIn: "1h",
      }
    );

    // Set cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
module.exports = { registerUser, loginUser };

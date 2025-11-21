const User = require("../Models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create a new user
const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validate input
    if (!email || !username || !password) {
      return res.status(400).json({ error: "please fill all the fields" });
    }

    // Check password length
    if(password.length < 6){
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({ email, username, password: hashedPassword });

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
    const {email, username, password } = req.body;

    // Validation
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ error: "Please fill all the required fields" });
    }

    // user can login with either email or username
    const identifier = email ? { email } : { username };

    // Check if user exists
    const userData = await User.findOne({ where: identifier });
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
      process.env.JWT_SECRET,
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

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();



router.post("/signup", async (req, res) => {

  try {

    const { name, email, phone, password } = req.body;

    const existing = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existing) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashed
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      error: "Signup failed"
    });

  }

});



router.post("/login", async (req, res) => {

  try {

    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier }
      ]
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        error: "Incorrect password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      error: "Login failed"
    });

  }

});

module.exports = router;
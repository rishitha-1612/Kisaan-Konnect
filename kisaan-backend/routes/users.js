const express = require("express");
const User = require("../models/User");

const router = express.Router();



router.get("/:id", async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch user"
    });

  }

});



router.put("/:id", async (req, res) => {

  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(user);

  } catch (error) {

    res.status(500).json({
      error: "Failed to update user"
    });

  }

});

module.exports = router;
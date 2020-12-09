// Get router
const express = require("express");
const router = express.Router();

// Get routes
const postRoutes = require("./modules/posts");

// Use routes
router.use("/post", postRoutes);

// Base Route
router.use("/", function (req, res) {
  res.send("Use the '/post' route");
});

// Non Error Fallback route
router.use("*", function (req, res) {
  res.status(404).send();
});

// Export router
module.exports = router;

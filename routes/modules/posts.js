const express = require("express");

const router = express.Router();

const post = require("../../controllers/posts-controller");

// Create
router.post("/", post.createPost);
// Read
router.get("/", post.getPosts);
router.get("/:id", post.getPost);
// Update
router.put("/:id", post.updatePost);
// Delete
router.delete("/:id", post.deletePost);

module.exports = router;

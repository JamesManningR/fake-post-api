const HttpError = require("../models/HttpError");
const Post = require("../models/Post");
const { posts } = require("../db");

// CREATE
const createPost = async (req, res, next) => {
  const { title, body } = req.body;
  const newPost = new Post({ title, body });

  return posts
    .addRecord(newPost)
    .catch(() => {
      const error = new HttpError("Could not create project", 500);
      next(error);
    })
    .then((createdPost) => {
      res.status(201).send(createdPost);
    });
};

// READ
const getPost = async (req, res, next) => {
  const id = req.params.id;

  return posts
    .getRecordById(id)
    .catch(() => {
      const error = new HttpError(`Post with ID: ${id} not found`, 404);
      next(error);
    })
    .then((post) => {
      return post;
    });
};

// INDEX
const getPosts = async (req, res, next) => {
  return posts
    .getAllRecords()
    .catch(() => {
      const error = new HttpError("Unable to gather posts", 500);
      next(error);
    })
    .then((foundPosts) => {
      if (foundPosts === -1) {
        const error = new HttpError("Nothing found", 204);
        next(error);
      } else {
        res.status(200).send(foundPosts);
      }
    });
};

// UPDATE
const updatePost = async (req, res, next) => {
  const id = req.params.id;
  const { title, body } = req.body;
  const postData = { title, body };

  posts
    .updateRecord(id, postData)
    .catch(() => {
      const error = new HttpError("Unable to update project", 500);
      next(error);
    })
    .then((updatedPost) => {
      res.status(200).send(updatedPost);
    });
};

// DELETE
const deletePost = async (req, res, next) => {
  const id = req.params.id;

  posts
    .removeRecord(id)
    .then((removedPostId) => {
      res.status(200).send(removedPostId);
    })
    .catch(() => {
      const error = new HttpError("Unable to delete project", 500);
      next(error);
    });
};

module.exports = {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
};

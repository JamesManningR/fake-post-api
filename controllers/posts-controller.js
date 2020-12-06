const HttpError = require("../models/HttpError");
const Post = require("../models/Post");
const { posts } = require("../db");

const getPost = async (req, res, next) => {
  const id = req.params.id;

  let post;

  try {
    post = await posts.getRecordById(id);
  } catch (err) {
    const error = new HttpError(`Post with ID: ${id} not found`, 404);
    return next(error);
  }
  return post;
};

const getPosts = async (req, res, next) => {
  let foundPosts;

  try {
    foundPosts = await posts.getAllRecords();
  } catch (err) {
    const error = new HttpError("Unable to gather posts", 500);
    return next(error);
  }
  if (!foundPosts) {
    const error = new HttpError("Nothing found", 404);
    return next(error);
  }
  res.send(foundPosts);
};

const createPost = async (req, res, next) => {
  const { title, body } = req.body;
  const newPost = new Post({ title, body });

  let createdPost;
  try {
    createdPost = await posts.addRecord(newPost);
  } catch (err) {
    const error = new HttpError("Could not create project", 500);
    return next(error);
  }
  res.status(201).send(createdPost);
};

const updatePost = async (req, res, next) => {
  const id = req.params.id;
  const { title, body } = req.body;
  const postData = { title, body };

  let updatedPost;

  try {
    updatedPost = await posts.updateRecord(id, postData);
  } catch (err) {
    console.log(err);
    const error = new HttpError("Unable to update project", 500);
    return next(error);
  }
  res.send(updatedPost);
};

const deletePost = async (req, res, next) => {
  const id = req.params.id;

  posts
    .removeRecord(id)
    .then((removedPostId) => {
      res.send(removedPostId);
    })
    .catch(() => {
      const error = new HttpError("Unable to delete project", 500);
      return next(error);
    });
};

module.exports = {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
};

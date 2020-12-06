const ObjectBased = require("./models/ObjectBased");
const posts = new ObjectBased("db/data/posts.json");

module.exports = { posts }
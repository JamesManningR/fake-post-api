class Post {
  constructor(content) {
    this.title = content.title;
    this.body = content.body;
    this.datePosted = new Date();
    this.dateUpdated = new Date();
  }
}

module.exports = Post;
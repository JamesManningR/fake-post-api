/* eslint-disable node/prefer-promises/fs */
const fs = require("fs").promises;

class JsonDbSystem {
  async getAllRecords() {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => {
        return JSON.parse(data);
      })
      .catch((err) => {
        throw err;
      });
  }

  async getRecorddByID(id) {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => {
        return JSON.parse(data)[id];
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = JsonDbSystem;

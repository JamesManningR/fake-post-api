/* eslint-disable node/prefer-promises/fs */
const fs = require("fs").promises;

class JsonDbSystem {
  async getRecorddByID(id) {
    return fs
      .readFile(this.filePath, "utf8")
      .catch((err) => {
        throw err;
      })
      .then((data) => {
        const foundRecord = JSON.parse(data)[id];
        const foundRecords = {}
        foundRecords[id] = foundRecord;
        return foundRecords;
      })
  }
}

module.exports = JsonDbSystem;

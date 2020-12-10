/* eslint-disable node/prefer-promises/fs */
const fs = require("fs").promises;
const JsonDbSystem = require("./JsonDbSystem");

const { v4: uuidv4 } = require("uuid");

class ObjectBasedTable extends JsonDbSystem {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  async addRecord(newRecord) {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => {
        let records = JSON.parse(data);

        let id = uuidv4();
        while (records[id] != undefined) {
          id = uuidv4();
        }

        records[id] = newRecord;

        return fs.writeFile(this.filePath, JSON.stringify(records))
          .then(() => {
            const newRecords = {};
            newRecords[id] = newRecord;
            return newRecords;
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  async getAllRecords() {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => {
        const parsedData = JSON.parse(data);
        return Object.keys(parsedData).length != 0 ? parsedData : -1;
      })
      .catch((err) => {
        throw err;
      });
  }

  async updateRecord(id, updatedRecord) {
    return fs
      .readFile(this.filePath, "utf-8")
      .then((data) => {
        let parsedData = JSON.parse(data);

        Object.assign(parsedData[id], updatedRecord);
        parsedData[id].dateUpdated = new Date();

        return fs
          .writeFile(this.filePath, JSON.stringify(parsedData))
          .catch((err) => {
            throw err;
          })
          .then(() => {
            const updatedRecords = {};
            updatedRecords[id] = updatedRecord;
            return updatedRecords;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  async removeRecord(id) {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => {
        const parsedData = JSON.parse(data);
        const deletedRecord = {};
        deletedRecord[id] = parsedData[id];
        delete parsedData[id];

        return fs
          .writeFile(this.filePath, JSON.stringify(parsedData))
          .catch((err) => {
            throw err;
          })
          .then(() => {
            return deletedRecord;
          });
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = ObjectBasedTable;

const fs = require("fs").promises;

const JsonDbSystem = require("./JsonDbSystem");

class ArrayTable extends JsonDbSystem {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  async addRecord(newRecord) {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => {
        const now = new Date();

        newRecord.dateCreated = now;
        newRecord.dateUpdated = now;

        const readData = JSON.parse(data);
        let writeData = readData.push(readData);

        fs.writeFile(JSON.stringify(writeData), this.filePath)
          .then(() => {
            return newRecord;
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
        return data.length > 0
          ? JSON.parse(data)
          : -1;
      })
      .catch((err) => {
        throw err;
      });
  }

  async updateRecord(id, updatedRecord) {
    return fs
      .readFile(this.filePath, "ut8")
      .then((data) => {
        let parsedData = JSON.parse(data);

        Object.assign(parsedData[id], updatedRecord);
        parsedData[id].dateUpdated = new Date();

        return fs
          .writeFile(JSON.stringify(parsedData), this.filePath)
          .catch((err) => {
            throw err;
          })
          .then(() => {
            return updatedRecord;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  async removeRecord(id) {
    return fs
      .readFile(this.filePath, "ut8")
      .then((data) => {
        const removedRecord = data.splice(id, 1);

        fs.writeFile(JSON.stringify(data), this.filePath)
          .catch((err) => {
            throw err;
          })
          .then(() => {
            return removedRecord[0];
          });
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = ArrayTable;

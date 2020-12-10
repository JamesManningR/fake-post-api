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

        // Generate Unique Id
        let id = uuidv4();
        while (records[id] != undefined) {
          id = uuidv4();
        }

        // Add new record to records
        records[id] = newRecord;

        // Write to file
        return fs.writeFile(this.filePath, JSON.stringify(records))
          .then(() => {
            // Return new record as a key value pair
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
        const readData = JSON.parse(data);
        return Object.keys(readData).length != 0 ? readData : -1;
      })
      .catch((err) => {
        throw err;
      });
  }

  async updateRecord(id, updatedRecord) {
    return fs
      .readFile(this.filePath, "utf-8")
      .then((data) => {
        let readData = JSON.parse(data);

        // Assign new data to updated values
        Object.assign(readData, updatedRecord);

        // Update the update date
        readData[id].dateUpdated = new Date();

        return fs
          .writeFile(this.filePath, JSON.stringify(readData))
          .catch((err) => {
            throw err;
          })
          .then(() => {
            // return new record as key value pair
            const updatedRecords = {};
            updatedRecords[id] = readData[id];
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
        const readData = JSON.parse(data);
        const deletedRecord = {};
        deletedRecord[id] = readData[id];
        delete readData[id];

        return fs
          .writeFile(this.filePath, JSON.stringify(readData))
          .catch((err) => {
            throw err;
          })
          .then(() => {
            // return removed record as key value pair
            const deletedRecords = {};
            deletedRecords[id] = updatedRecord;
            return deletedRecords;
          });
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = ObjectBasedTable;

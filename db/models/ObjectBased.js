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
        const storeData = JSON.parse(data);
        return Object.keys(storeData).length != 0 ? storeData : -1;
      })
      .catch((err) => {
        throw err;
      });
  }

  async updateRecord(id, newData) {
    return fs
      .readFile(this.filePath, "utf-8")
      .then(async (fileData) => {
        let storeData = JSON.parse(fileData);
        let updatedRecord = storeData[id];
        // Assign new data to updated values
        Object.assign(updatedRecord, newData);
        // Update the update date
        updatedRecord.dateUpdated = new Date();

        // update the record
        storeData[id] = updatedRecord;

        try {
          await fs
            .writeFile(this.filePath, JSON.stringify(storeData));
        } catch (err) {
          throw err;
        }
        // return new record as key value pair
        const updatedRecords = {};
        updatedRecords[id] = storeData[id];
        return updatedRecords;
      })
      .catch((err) => {
        throw err;
      });
  }

  async removeRecord(id) {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => {
        const storeData = JSON.parse(data);
        const deletedRecord = {};
        deletedRecord[id] = storeData[id];
        delete storeData[id];

        return fs
          .writeFile(this.filePath, JSON.stringify(storeData))
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

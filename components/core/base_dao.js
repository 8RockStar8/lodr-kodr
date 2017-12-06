const Utility = require('./../../services/utility');

class BaseDao {
  constructor(collection) {
    this.collection = collection;
  }

  getData(query) {
    if (!this.collection) {
        return res.send(Utility.generateErrorMessage(
          Utility.ErrorTypes.CONTRACT_VIOLATION)
        );
    }
    query = query || {};
    this.collection.find(query);
  }

  insertData(query) {
    if (!query) {
      return res.send(Utility.generateErrorMessage(
        Utility.ErrorTypes.INVALID_QUERY)
      );
    }
    this.collection.create(query);
  }

  updateData(id, query) {
    if (!query) {
      return res.send(Utility.generateErrorMessage(
        Utility.ErrorTypes.INVALID_QUERY)
      );
    }
    this.collection.update({_id: id}, {$set: query});
  }

  deleteData(query) {
    if (!query) {
      return res.send(Utility.generateErrorMessage(
        Utility.ErrorTypes.INVALID_QUERY)
      );
    }
    this.collection.findOneAndRemove(query);
  }
}

module.exports = BaseDao;

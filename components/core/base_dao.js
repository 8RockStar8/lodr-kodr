const Utility = require('./../../services/utility');

class BaseDao {
  constructor(collection) {
    this.collection = collection;
  }

  getData(query) {
    if (!this.collection) {
        return Utility.generateErrorMessage(
          Utility.ErrorTypes.CONTRACT_VIOLATION);

        console.log('error')
    }
    query = query || {};
    return this.collection.find(query);
  }

  insertData(query) {
    if (!query) {
      return Utility.generateErrorMessage(
        Utility.ErrorTypes.INVALID_QUERY);
    }
    return this.collection.create(query);
  }

  updateData(id, query) {
    if (!query) {
      return Utility.generateErrorMessage(
        Utility.ErrorTypes.INVALID_QUERY);

    }
    return this.collection.update({_id:id}, {$set: query})

    //console.log(user)

  }

  deleteData(id) {
    if (!id) {
      return Utility.generateErrorMessage(
        Utility.ErrorTypes.INVALID_QUERY);

    }
    console.log(id);
    this.collection.findByIdAndRemove(id, (err,data) =>{
        if(err) {
            console.log(err);
            return err;
        }
        console.log(data)
        return data;
    });
  }
}

module.exports = BaseDao;

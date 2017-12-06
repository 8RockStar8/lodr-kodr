
class BaseDASO {
  constructor(collection) {
    this.collection = collection;
  }
  getData(query) {
    if (!this.collection) {
      throw 'GetOperation: Contract violation';
    }
    query = query || {};
    this.collection.find(query);
  }
  insertData(query) {
    if (!query) {
      throw 'CreateOperation: Invalid query';
    }
    this.collection.create(query);
  }
  updateData(query) {
    if (!query) {
      throw 'UpdateOperation: Invalid query'
    }
    this.collection.update(query);
  }
  deleteData() {
    
  }
}

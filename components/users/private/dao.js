mongoose.createConnection(lalalala); //

const BaseDAO = require('./../../core/base_dao');

require('./model');
let usersCollection = mongoose.model('127.0.0.1:27017/lodrkodrdb');

class UsersDAO extends BaseDAO {
  constructor() {
    let usersCollection = mongoose.model('users');
    super(usersCollection);
  }
  getData() {
    usersCollection.find({}).then(users => {
      return users;
    }).catch(err => {
      return err;
    })
  }
}

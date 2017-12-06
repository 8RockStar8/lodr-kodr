
const UsersDAO = require('./private/dao');

class UsersService {
  getUsers() {
    UsersDao.getData({}).then()
  }
}

module.exports = new UsersService();

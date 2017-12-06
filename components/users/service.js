const UsersDao = require('./private/dao');
const Utility = require('./../../services/utility');

class UsersService {

  getUsers() {
      return new Promise((resolve, reject) => {
          UsersDao.getData()
                 .skip(req.query.offset)
                 .limit(req.query.limit)
                 .then(data => {
                      resolve(data);
                  }).catch(err => {
                      reject(Utility.generateErrorMessage(
                        Utility.ErrorTypes.NOT_FOUND_DATA)
                      );
                  })
      })
  }

  insertUsers(user) {
      return new Promise((resolve, reject) => {
          UsersDao.insertData({
              fullname: user.fullname,
              username: user.username,
              password: user.password,
              email: user.email,
              birthday: user.birthday
          }).then(data => {
              resolve(data);
          }).catch(err => {
            reject(Utility.generateErrorMessage(
              Utility.ErrorTypes.USER_CREATION_ERROR)
            );
          })
      })
  }

  updateUsers(id, user) {
      return new Promise((resolve, reject) => {
          UsersDao.updateData(id, user).then(data => {
              resolve(data);
          }).catch(err => {
              reject(Utility.generateErrorMessage(
                Utility.ErrorTypes.USER_UPDATE_ERROR)
              );
            })
      })
  }

  deleteUsers(user) {
    return new Promise((resolve, reject) => {
        UsersDao.deleteData(user).then(data => {
            resolve(data);
        }).catch(err => {
          reject(Utility.generateErrorMessage(
            Utility.ErrorTypes.USER_DELETE_ERROR)
          );
        })
    })
  }
}




module.exports = new UsersService();

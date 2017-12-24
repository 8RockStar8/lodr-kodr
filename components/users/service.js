const UsersDao = require('./private/dao');
const Utility = require('./../../services/utility');
const AppConstants = require('./../../settings/constants');
const UserValidator = require('./../../services/validators/user-validator');
const UsersResponse = require('./private/response');

const crypto = require('crypto');

class UsersService {

  getUsers(query) {
      query = query || {};
      return new Promise((resolve, reject) => {
          UsersDao.getData(query)
                 .skip(AppConstants.offset)
                 .limit(AppConstants.limit)
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
      let uv_response = UserValidator.validateUsername(user.username);
      if (uv_response != Utility.ErrorTypes.SUCCESS) {
          return Utility.generateErrorMessage(uv_response);
      }
      let pass_response = UserValidator.validatePassword(user.password);
      if (pass_response != Utility.ErrorTypes.SUCCESS) {
          return Utility.generateErrorMessage(pass_response);
      }
      if(user.name) {
          let name_response = UserValidator.validateName(user.name);
          if (name_response != Utility.ErrorTypes.SUCCESS) {
              return Utility.generateErrorMessage(name_response);
          }
      }
      if(user.age) {
          let age_response = UserValidator.validateAge(user.age);
          if (age_response != Utility.ErrorTypes.SUCCESS) {
              return Utility.generateErrorMessage(age_response);
          }
      }
      if(user.email) {
          let email_response = UserValidator.validateEmail(user.email);
          if (email_response != Utility.ErrorTypes.SUCCESS) {
              return Utility.generateErrorMessage(email_response);
          }
      }

      user.password = crypto.createHash('sha1').update(user.password + 'chlp').digest('hex');
      return new Promise((resolve, reject) => {
          return UsersDao.insertData(user).then(data => {
              return resolve(data)
          }).catch(err => {
            reject(Utility.generateErrorMessage(
              Utility.ErrorTypes.USER_CREATION_ERROR)
            );
          });
      });
  }

  updateUsers(id, user) {
    //   let uv_response = UserValidator.validateUsername(user.username);
    //   if (uv_response != Utility.ErrorTypes.SUCCESS) {
    //       console.log(Utility.generateErrorMessage(uv_response));
    //       return Utility.generateErrorMessage(uv_response);
    //   }
    //   let age_response = UserValidator.validateAge(user.age);
    //       if (age_response != Utility.ErrorTypes.SUCCESS) {
    //           console.log(Utility.generateErrorMessage(age_response));
    //           return Utility.generateErrorMessage(age_response);
    //     }
    //
    //  let email_response = UserValidator.validateEmail(user.email);
    //  if (email_response != Utility.ErrorTypes.SUCCESS) {
    //    console.log(Utility.generateErrorMessage(email_response));
    //    return Utility.generateErrorMessage(email_response);
    // }


     return new Promise((resolve, reject) => {
          UsersDao.updateData(id, user).then(data => {
              resolve(data);
          }).catch(err => {
             reject(Utility.generateErrorMessage(
               Utility.ErrorTypes.USER_UPDATE_ERROR)
              );
          });
      });
  }

  deleteUsers(user) {
    return new Promise((resolve, reject) => {
        UsersDao.deleteData(user).then(data => {
            if(!user) {
                return res.send(Utility.generateErrorMessage(
                  Utility.ErrorTypes.USER_ID_ERROR)
                );
            }
            resolve(data);
        }).catch(err => {
            reject(Utility.generateErrorMessage(
              Utility.ErrorTypes.USER_DELETE_ERROR)
            );
          })
    });
  }
}


module.exports = new UsersService();

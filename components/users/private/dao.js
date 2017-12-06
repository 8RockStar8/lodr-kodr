const mongoose = require('mongoose');
require('./model');
const BaseDao = require('./../../core/base_dao');
const con = require('./../../core/db_connection')



class UsersDao extends BaseDao {
  constructor() {
      super(con.model('users'));
  }

  insertData(query) {
      if (!query) {
          return res.send(Utility.generateErrorMessage(
              Utility.ErrorTypes.INVALID_QUERY)
          );
      }
      con.model('users').findOne({username: query.username}, (err, data) => {
          if (data) {
              return res.send(Utility.generateErrorMessage(
                  Utility.ErrorTypes.INVALID_USERNAME_IDENTIFIER)
              );
          }
      });
      con.model('users').create(query);
  }
}

module.exports = new UsersDao();

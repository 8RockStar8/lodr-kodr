const mongoose = require('mongoose');
require('./model');
const BaseDao = require('./../../core/base_dao');
const con = require('./../../core/db_connection');
const Utility = require('./../../../services/utility');



class UsersDao extends BaseDao {
  constructor() {
      super(con.model('users'));
  }

  // insertDatas(query) {
  //     if (!query) {
  //         return res.send(Utility.generateErrorMessage(
  //             Utility.ErrorTypes.INVALID_QUERY)
  //         );
  //     }
  //     query = query || {};
  //     return (con.model('users').findOne({username: query.username}, (err, data) => {
  //         if (data) {
  //             console.log(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_USERNAME_IDENTIFIER))
  //             return Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_USERNAME_IDENTIFIER);
  //         }
  //         if (err) {
  //             console.log(err);
  //             return err;
  //         }
  //         return con.model('users').create(query);
     // }));

  }


module.exports = new UsersDao();

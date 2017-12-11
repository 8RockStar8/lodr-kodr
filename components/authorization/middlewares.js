const Utility = require('./../../services/utility');
const con = require('./../core/db_connection')
require('./../users/private/model');
require('./../photos/private/model');

class Autherisation {

 _auth(permission) {
    return function (req, res, next) {
        if (permission == 'optional') {
        return next();
      }
      if (permission == 'user') {
        con.model('users').findOne({key: req.query.key}, (err, user) => {
          if (!user) {
            return res.send(Utility.generateErrorMessage(
                Utility.ErrorTypes.PERMISSION_DENIED));
          }
          req.user = user;
          return next();
        });
      }
      if (permission == 'admin') {
        app.db.users.findOne({key: req.query.key, role: 'admin'}, (err, user) => {
          if (!user) {
            return res.send(Utility.generateErrorMessage(
                Utility.ErrorTypes.PERMISSION_DENIED)
            );
          }
          req.user = user;
          return next();
        });
      }
    }
  }

static _isExist(){
    return function(req, res, next) {
        con.model('users').findOne({key: req.query.key}, (err, user) => {
            if (!user) {
                return res.send(Utility.generateErrorMessage(
                    Utility.ErrorTypes.PERMISSION_DENIED));
            }
            req.user = user;
            con.model("photos").findOne({author: req.user._id}, (err,data) => {
                if(data) {
                    return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.AVATAR_EXIST));
                 }
                 return next();
                });
            });
          }
      }

};

module.exports = new Autherisation();

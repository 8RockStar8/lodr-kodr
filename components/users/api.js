const express = require('express');
const crypto = require('crypto');
const UsersRouter = express.Router();
const UsersService = require('./service');
const Utility = require('./../../services/utility');
// const auth = require('./private/middleware');

UsersRouter.get('/', /*auth._auth('user'), */(req, res) => {
    if (!req.query.key) {
        return res.send(Utility.generateErrorMessage(
          Utility.ErrorTypes.PERMISSION_DENIED)
        );
    }
    UsersService.getUsers().then(data => {
        return res.send(data);
    });
});

UsersRouter.post('/', /*auth._auth('optional'), */(req, res) => {
    let user = {
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday
    }
    let uv_response = UserValidator.validateUsername(user.username);
    if (uv_response != Utility.ErrorTypes.SUCCESS) {
        return res.send(Utility.generateErrorMessage(uv_response));
    }
    let pass_response = UserValidator.validatePassword(user.password);
    if (pass_response != Utility.ErrorTypes.SUCCESS) {
        return res.send(Utility.generateErrorMessage(pass_response));
    }
    if(user.name) {
        let name_response = UserValidator.validateName(user.name);
        if (name_response != Utility.ErrorTypes.SUCCESS) {
            return res.send(Utility.generateErrorMessage(name_response));
        }
    }
    if(user.age) {
        let age_response = UserValidator.validateAge(user.age);
        if (age_response != Utility.ErrorTypes.SUCCESS) {
            return res.send(Utility.generateErrorMessage(age_response));
        }
    }
    if(user.email) {
        let email_response = UserValidator.validateEmail(user.email);
        if (email_response != Utility.ErrorTypes.SUCCESS) {
            return res.send(Utility.generateErrorMessage(email_response));
        }
    }

    user.password = crypto.createHash('sha1').update(user.password + 'chlp').digest('hex');

    UsersService.insertUsers(user).then(data => {
        return res.send(data);
    });
});

UsersRouter.put('/:id',/* auth._auth('user'), */(req, res) => {
    if (req.user.role != 'admin') {
        if (req.params.id != req.user._id) {
            return res.send(Utility.generateErrorMessage(
                Utility.ErrorTypes.PERMISSION_DENIED)
            );
          }
    }
    if(err) {
        return res.send(Utility.generateErrorMessage(
            Utility.ErrorTypes.USER_ID_ERROR)
        );
    }
    let user = {
        username : req.body.username || data.username,
        password : req.body.password || data.password,
        name : req.body.name || data.name,
        age : req.body.age || data.age,
        email : req.body.email || data.email
    }
    let id = req.params.id;
    let uv_response = UserValidator.validateUsername(user.username);
    if (uv_response != Utility.ErrorTypes.SUCCESS) {
        return res.send(Utility.generateErrorMessage(uv_response));
    }
    let pass_response = UserValidator.validateUsername(user.password);
    if (pass_response != Utility.ErrorTypes.SUCCESS) {
        return res.send(Utility.generateErrorMessage(pass_response));
    }
    if(user.name) {
        let name_response = UserValidator.validateName(user.name);
        if (name_response != Utility.ErrorTypes.SUCCESS) {
            return res.send(Utility.generateErrorMessage(name_response));
        }
    }
    if(user.age) {
        let age_response = UserValidator.validateAge(user.age);
        if (age_response != Utility.ErrorTypes.SUCCESS) {
          return res.send(Utility.generateErrorMessage(age_response));
      }
    }
    if(user.email) {
        let email_response = UserValidator.validateEmail(user.email);
        if (email_response != Utility.ErrorTypes.SUCCESS) {
            return res.send(Utility.generateErrorMessage(email_response));
        }
    }
    user.password = crypto.createHash('sha1').update(user.password + 'chlp').digest('hex');
    UsersService.updateUsers(id, user).then(data => {
        return res.send(data);
    });

});

UsersRouter.delete('/:id', /*auth._auth('admin'), */(req, res) => {
  let id = req.params.id;
  if(!id) {
      return res.send(Utility.generateErrorMessage(
        Utility.ErrorTypes.USER_ID_ERROR)
      );
  }
  UsersService.updateUsers({_id: id}).then(data => {
      return res.send(data);
  })
})

module.exports = UsersRouter;

const express = require('express');
const crypto = require('crypto');

const UsersRouter = express.Router();
const UsersService = require('./service');
const Utility = require('./../../services/utility');
const UserValidator = require('./../../services/validators/user-validator');
const auth = require('./../authorization/user_service');

UsersRouter.get('/',auth._auth('optional'), Utility.parseQuery, (req, res) => {
    if (!req.query.key) {
        return res.send(Utility.generateErrorMessage(
          Utility.ErrorTypes.PERMISSION_DENIED)
        );
    }
    UsersService.getUsers().then(data => {
        return res.send(data);
    });
});

UsersRouter.post('/', auth._auth('optional'), (req, res) => {
    let user = {
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: parseInt(req.body.age)
    }

    UsersService.insertUsers(user).then(data => {
        return res.send(data);
    }).catch(err => {
        return res.send(err);
    });
});

UsersRouter.put('/:id', auth._auth('user'), (req, res) => {

    if(req.body.password){
        res.send("If you want to change password make a put request '/api/users/password' ");
    }
    let id = req.params.id;
    let user = {};
    if (req.body.fullname) {
        user.fullname = req.body.fullname;
    }
    if (req.body.username) {
        user.username = req.body.username;
    }
    if (isFinite(parseInt(req.body.age))) {
        user.age = parseInt(req.body.age);
    }
    if (req.body.email) {
        user.email = req.body.email;
    }
    UsersService.updateUsers(id, user).then(data => {
         return res.send(data);
     }).catch(err => {
         res.send(err)
     });

});

UsersRouter.delete('/:id', auth._auth('admin'), (req, res) => {
    let id = req.params.id;
    UsersService.deleteUsers(id).then(data => {
        if(!data) {
            return res.send(Utility.generateErrorMessage(
              Utility.ErrorTypes.INVALID_DATA));
        }
        return res.send(data);
    }).catch(err =>{
        res.send(err);
    });
})

module.exports = UsersRouter;

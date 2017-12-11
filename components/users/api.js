const express = require('express');
const crypto = require('crypto');

const UsersRouter = express.Router();
const UsersService = require('./service');
const Utility = require('./../../services/utility');
const UserValidator = require('./../../services/validators/user-validator');
// const auth = require('./private/middleware');

UsersRouter.get('/', /*auth._auth('user'), */(req, res) => {
    // if (!req.query.key) {
    //     return res.send(Utility.generateErrorMessage(
    //       Utility.ErrorTypes.PERMISSION_DENIED)
    //     );
    // }
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
        age: req.body.age
    }
    console.log(user);

    UsersService.insertUsers(user).then(data => {
        console.log(data);
        return res.send(data);
    });
});

UsersRouter.put('/:id',/* auth._auth('user'), */(req, res) => {
    // if (req.user.role != 'admin') {
    //     if (req.params.id != req.user._id) {
    //         return res.send(Utility.generateErrorMessage(
    //             Utility.ErrorTypes.PERMISSION_DENIED)
    //         );
    //     }
    // }
    let user = {
        username : req.body.username || data.username,
        password : req.body.password || data.password,
        name : req.body.name || data.name,
        age : req.body.age || data.age,
        email : req.body.email || data.email
    }
    let id = req.params.id;
    UsersService.updateUsers(id, user).then(data => {
        return res.send(data);
    });

});

UsersRouter.delete('/:id', /*auth._auth('admin'), */(req, res) => {
    let user = {
        id: req.params.id
    }
    UsersService.deleteUsers(user).then(data => {
        return res.send(data);
    })
})

module.exports = UsersRouter;

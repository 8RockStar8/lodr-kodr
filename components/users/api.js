const express = require('express');
const crypto = require('crypto');

const UsersRouter = express.Router();
const UsersService = require('./service');
const Utility = require('./../../services/utility');
const UserValidator = require('./../../services/validators/user-validator');
const auth = require('./../authorization/middlewares');

UsersRouter.get('/',/* auth._auth('optional'),*/Utility.parseQuery(),(req, res) => {

    // if (!req.query.key) {
    //     return res.send(Utility.generateErrorMessage(
    //       Utility.ErrorTypes.PERMISSION_DENIED)
    //     );
    // }
    console.log("1");
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
        age: req.body.age
    }
    console.log(user);

    UsersService.insertUsers(user).then(data => {
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
    if(req.body.password){
        res.send("If you want to change password make a put request '/api/users/password' ");
    }
    let id = req.params.id;
    UsersService.getUsers({_id: id}).then(data => {
        let user = {
            fullname: req.body.fullname || data.fullname,
            username : req.body.username || data.username,
            age : parseInt(req.body.age),
            email : req.body.email || data.email
        }


      user.age ? user.age = parseInt(req.body.age) : user.age = parseInt(data.age);
console.log(typeof req.body.age);
       UsersService.updateUsers(id, user).then(data => {
            return res.send(data);
        }).catch(err =>{
            console.log(err);
            res.send(err)
        });
    })


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

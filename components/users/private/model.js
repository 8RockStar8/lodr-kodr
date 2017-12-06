const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
  username: String
})


module.exports = mongoose.model('users', UsersSchema);

const mongoose = require('mongoose');
const keygen = require('keygenerator');

const AppConstants = require('./../../../settings/constants');
const AppSettings = require('./../../../settings/service');
const UsersSettings = AppSettings.users;

const Schema = mongoose.Schema;

function generateAPIKey() {
    return (keygen._({ length: 2 }) + '-' + keygen._({ length: 6 })
        + '-' + keygen.number()
        + '-' + keygen._({ length: 6 })
        + '-' + keygen._({ length: 8 })).replace(/&/g, '');
}

let UsersSchema = new Schema({
  fullname: {
    type: String,
    minLength: AppConstants.NAME_MIN_LENGTH,
    maxLength: AppConstants.NAME_MAX_LENGTH,
    default: null
  },
  username: {
    type: String,
    trim: true,
    lowercase: true,
    index: {unique: true},
    minLength: AppConstants.USERNAME_MIN_LENGTH,
    maxLength: AppConstants.USERNAME_MAX_LENGTH
  },
  password: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    minLength: AppConstants.EMAIL_MIN_LENGTH,
    maxLength: AppConstants.EMAIL_MAX_LENGTH
  },
  age: {
    type: Number,
    minLength: AppConstants.AGE_MIN_LENGTH,
    maxLength: AppConstants.AGE_MAX_LENGTH
  },
  role: {
    type: String,
    enum: UsersSettings.role_enum_values,
    default: UsersSettings.roles.USER
  },
  key: {
    type: String,
    default: generateAPIKey
  }
});

module.exports = mongoose.model('users', UsersSchema);

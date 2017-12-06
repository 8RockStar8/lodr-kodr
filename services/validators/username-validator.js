const BaseValidator = require('./base');

const AppConstants = require('./../../settings/constants');
const Utility = require('./../utility');


class UsernameValidator extends BaseValidator {
  constructor () {
    super ();
  }
  validator (str) {
    if (AppConstants.USERNAME_REG_EXP.test(str)) {
      return Utility.ErrorTypes.SUCCESS;
    }
    return Utility.ErrorTypes.INVALID_USERNAME;
  }
};

module.exports = new UsernameValidator ();

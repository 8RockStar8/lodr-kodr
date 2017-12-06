const BaseValidator = require('./base');

const AppConstants = require('./../../settings/constants');
const Utility = require('./../utility');


class PasswordValidator extends BaseValidator {
  constructor () {
    super ();
  }
  validator (str) {
    if (!super.validator(str, BaseValidator.Types.STRING)) {
      return false;
    }
    if(!str) {
     return Utility.PASSWORD_MISSING;
    }
    let passRegExp = AppConstants.PASSWORD_REG_EXP;
    let nopassRegExp = AppConstants.NOT_PASSWORD_REG_EXP;
    if (passRegExp.test(str) && !nopassRegExp.test(str)) {
      return Utility.ErrorTypes.SUCCESS;
    }
    return Utility.ErrorTypes.INVALID_PASSWORD;
  }
}

module.exports = new PasswordValidator ();

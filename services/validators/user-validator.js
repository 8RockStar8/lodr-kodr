const BaseValidator = require('./base');

const UsernameValidator = require('./username-validator');
const PasswordValidator = require('./password-validator');
const NameValidator = require('./name-validator');
const AgeValidator = require('./age-validator');
const EmailValidator = require('./email-validator');

const Utility = require('./../utility');
const AppConstants = require('./../../settings/constants');

class UserValidator extends BaseValidator {
    constructor() {
        super();
    }

    validateUsername(username, sanitize) {

        if (!username) {

            return Utility.ErrorTypes.USERNAME_MISSING;
        }
        if (username.length < AppConstants.USERNAME_MIN_LENGTH
            || username.length > AppConstants.USERNAME_MAX_LENGTH)
        {
            return Utility.ErrorTypes.INVALID_USERNAME_RANGE;
        }
        //console.log(UsernameValidator.validator(username));
        return UsernameValidator.validator(username);
        // TODO:
        /*
        if (sanitize) {
            _sanitizeUsername(username);
        }
        */
    }

    validatePassword(password, sanitize) {
      if (!password) {
          return Utility.ErrorTypes.PASSWORD_MISSING;
      }
      if (password.length < AppConstants.PASSWORD_MIN_LENGTH
          || password.length > AppConstants.PASSWORD_MAX_LENGTH)
      {
          return Utility.ErrorTypes.INVALID_PASSWORD_RANGE;
      }
      return PasswordValidator.validator(password);
    }

    validateName(name, sanitize) {
      return NameValidator.validator(name);
    }

    validateAge (age, sanitize) {
      return AgeValidator.validator(age);
    }
    validateEmail (email, sanitize) {
      return EmailValidator.validator(email);
    }
}

module.exports = new UserValidator();

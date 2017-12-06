const BaseValidator = require('./base');
const Utility = require('./../utility');
const AppConstants = require('./../../settings/constants');

class EmailValidator extends BaseValidator
{
    constructor()
    {
        super();
    }
    validator (email)
    {
        if(!email) {
            return Utility.ErrorTypes.EMAIL_MISSING;
        }

       if(!super.validator(email, BaseValidator.Types.STRING)) {
            return Utility.ErrorTypes.INVALID_TYPE;
        }

        if(email.length > AppConstants.EMAIL_MAX_LENGTH || email.length < AppConstants.EMAIL_MIN_LENGTH) {
            return Utility.ErrorTypes.INVALID_EMAIL;
        }

        let emailRegExp = AppConstants.EMAIL_REG_EXP;
        if(emailRegExp.test(email))
            return Utility.ErrorTypes.SUCCESS;
        return Utility.ErrorTypes.INVALID_EMAIL;
    }
}

module.exports = new EmailValidator();

const BaseValidator = require('./base');
const Utility = require('./../utility');
const AppConstants = require('./../../settings/constants');


class nameValidator extends BaseValidator
{
    constructor()
    {
        super();
    }
    validator (name)
    {
        if(!super.validator(name, BaseValidator.Types.STRING)) {
            return Utility.ErrorTypes.INVALID_TYPE
        }

        /*if(name.length > AppConstants.NAME_MAX_LENGTH ) {
            return Utility.ErrorTypes.INVALID_NAME;
        }*/

        let nameRegExp = AppConstants.NAME_REG_EXP;
        if(nameRegExp.test(name))
            return Utility.ErrorTypes.SUCCESS;
        return Utility.ErrorTypes.INVALID_NAME;

    }
}

module.exports = new nameValidator();

const AppConstants = require('./../../settings/constants');

const Types = {
  DATE : 'date',
  STRING : 'string',
  NUMBER : 'number',
  SYMBOL : 'symbol'
}

class BaseValidator {

  constructor() {
    this.handlers = {};
    this.handlers[Types.DATE] = this._isDate;
    this.handlers[Types.STRING] = this._isString;
    this.handlers[Types.NUMBER] = this._isNumber;
    this.handlers[Types.SYMBOL] = this._isSymbol;
  }

  validator (str,type) {
    if(!this.handlers[type]) {
      return false;
    }
    return this.handlers[type](str);
  }

  _isString (str) {
     if(!str)
       return false ;
     return (typeof(str) === 'string');
  }

  _isNumber (str) {
    if (!str) {
     return false;
    }
    let numberRegExp = AppConstants.NUMBER_REG_EXP;
    return numberRegExp.test(str);
  }

  _isDate (str) {
    if(!str) {
       return false;
    }
    return  Date.parse(str);
  }

  _isSymbol (str) {
    if(!str) {
      return false;
    }
    let symbolRegExp = AppConstants.SYMBOL_REG_EXP;
    return symbolRegExp.test(str);
  }
}

module.exports = BaseValidator;
module.exports.Types = Types;

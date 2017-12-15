const AppConstants = {
  LIMIT_DEFAULT_VALUE : 20,
  OFFSET_DEFAULT_VALUE:0,
  USERNAME_MIN_LENGTH:4,
  USERNAME_MAX_LENGTH:20,
  PASSWORD_MIN_LENGTH:6,
  PASSWORD_MAX_LENGTH:24,
  AGE_MIN_LENGTH: 14,
  AGE_MAX_LENGTH: 101,
  EMAIL_MIN_LENGTH: 6,
  EMAIL_MAX_LENGTH:30,
  NAME_MAX_LENGTH:20,
  USERNAME_REG_EXP: /^[\w+_]{4,24}$/,
  PASSWORD_REG_EXP: /^[\w+_-]{6,20}$/,
  NOT_PASSWORD_REG_EXP: /^(\w+)?(password)(\w+)?$/i,
  NUMBER_REG_EXP: /^[+-]?(([0-9])+([.][0-9]*)?|[.][0-9]+)$/,
  SYMBOL_REG_EXP: /^[!@#\$%\^\&*\)\(+=~._-]+$/,
  DB_URL:'127.0.0.1:27017/lodrkodrdb',
  EMAIL_REG_EXP:  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  NAME_REG_EXP:    /^[a-zA-Z]+((['_.-][a-zA-Z ])?[a-zA-Z]*)$/,
  PHOTOS_TYPE: /\.(jpg|jpeg|png|PNG)$/
}

module.exports = AppConstants;

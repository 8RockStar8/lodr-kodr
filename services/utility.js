const AppConstants = require('./../settings/constants');

const ErrorTypes = {
    SUCCESS: 'success',
    NO_FILE: 'no_file',
    PHOTOS_TYPE: 'photos_type_error',
    INVALID_AGE: 'invalid_age',
    AVATAR_EXIST: 'avatar_exist',
    INVALID_DATA: 'invalid_data',
    INVALID_NAME: 'invalid_name',
    INVALID_TYPE: 'invalid_type',
    INVALID_EMAIL: 'invalid_email',
    EMAIL_MISSING: 'email_missing',
    USER_ID_ERROR: 'user_id_error',
    CODE_ID_ERROR: 'code_id_error',
    UNKNOWN_ERROR: 'unknown_error',
    INVALID_QUERY: 'invalid_query',
    NOT_FOUND_DATA: 'not_found_data',
    UPLOADING_ERROR: 'uploading_error',
    VALIDATION_ERROR: 'validation_error',
    USERNAME_MISSING: 'username_missing',
    PASSWORD_MISSING: 'password_missing',
    INVALID_PASSWORD: 'invalid_password',
    INVALID_USERNAME: 'invalid_username',
    USER_UPDATE_ERROR: 'user_update_error',
    CODE_UPDATE_ERROR: 'code_update_error',
    USER_DELETE_ERROR: 'user_delete_error',
    CODE_DELETE_ERROR: 'code_delete_error',
    CONTRACT_VIOLATION: 'contract_violation',
    PHOTO_DELETE_ERROR: 'photo_delete_error',
    PERMISSION_DENIED: 'permission_denied',
    USER_CREATION_ERROR: 'user_creation_error',
    CODE_CREATION_ERROR: 'code_creation_error',
    PHOTO_CREATION_ERROR: 'photo_creation_error',
    CODE_PERMISSION_DENIED: 'code_permission_denied',
    INVALID_USERNAME_RANGE: 'invalid_username_range',
    INVALID_PASSWORD_RANGE: 'invalid_password_range',
    PHOTO_PERMISSION_DENIED: 'photo_permission_denied',
    INVALID_USERNAME_IDENTIFIER: 'invalid_username_identifier'
};

class Utility {
    static parseQuery(req, res, next) {
        req.query.offset = parseInt(req.query.offset);
        if (!isFinite(req.query.offset)) {
            req.query.offset = AppConstants.OFFSET_DEFAULT_VALUE;
        }

        req.query.limit = parseInt(req.query.limit);
        if (!isFinite(req.query.limit)) {
            req.query.limit = AppConstants.LIMIT_DEFAULT_VALUE;
        }
        return next();
    }

    static generateErrorMessage(type, options) {
        options = options || {};
        let error_object = {
            type: type || ErrorTypes.UNKNOWN_ERROR,
            message: 'Something went wrong..'
        };
        switch (type) {
            case ErrorTypes.USERNAME_MISSING:
                error_object.message = 'Username is not specified.';
                break;
            case ErrorTypes.CODE_PERMISSION_DENIED:
                error_object.message = 'You don\'t have permission for this operation.';
                break;
            case ErrorTypes.PASSWORD_MISSING:
                error_object.message = 'Password is not specified.';
                break;
            case ErrorTypes.INVALID_USERNAME_RANGE:
                error_object.message = 'Invalid min/max value for username, must be >= {min} and <= {max}, your value is: {val}'.replace('{min}', AppConstants.USERNAME_MIN_LENGTH)
                            .replace('{max}', AppConstants.USERNAME_MAX_LENGTH);
                break;
            case ErrorTypes.INVALID_PASSWORD:
                error_object.message = 'Password can not include "password" word.';
                break;
            case ErrorTypes.INVALID_USERNAME:
                error_object.message = 'Username must have only letters, numbers and (_, -, .) symbols. ';
                break;
            case ErrorTypes.PERMISSION_DENIED:
                error_object.message = 'Don\'t have permission for this operation.';
                break;
            case ErrorTypes.PHOTO_PERMISSION_DENIED:
                error_object.message = 'Don\'t have permission for this operation.';
                break;
            case ErrorTypes.INVALID_PASSWORD_RANGE:
                error_object.message = 'Invalid min/max value for password.';
                break;
            case ErrorTypes.USER_CREATION_ERROR:
                error_object.message = 'Failed to create a user.';
                break;
            case ErrorTypes.CODE_CREATION_ERROR:
                error_object.message = 'Failed to create a code.';
                break;
            case ErrorTypes.PHOTO_CREATION_ERROR:
                error_object.message = 'Failed to create a photo.';
                break;
            case ErrorTypes.INVALID_USERNAME_IDENTIFIER:
                error_object.message = 'User already exists.';
                break;
            case ErrorTypes.USER_DELETE_ERROR:
                error_object.message = 'User can not deleted';
                break;
            case ErrorTypes.CODE_DELETE_ERROR:
                error_object.message = 'Code can not deleted';
                break;
            case ErrorTypes.PHOTO_DELETE_ERROR:
                error_object.message = 'Photo can not deleted';
                break;
            case ErrorTypes.USER_ID_ERROR:
                error_object.message = 'User id is undefined';
                break;
            case ErrorTypes.CODE_ID_ERROR:
                error_object.message = 'Code id is undefined';
                break;
            case ErrorTypes.USER_UPDATE_ERROR:
                error_object.message = 'User can not updated';
                break;
            case ErrorTypes.CODE_UPDATE_ERROR:
                error_object.message = 'Code can not updated';
                break;
            case ErrorTypes.INVALID_TYPE:
                error_object.message = 'Invalid TYPE';
                break;
            case ErrorTypes.INVALID_AGE:
                error_object.message ='Age is wrong';
                break;
            case ErrorTypes.INVALID_NAME:
               error_object.message ='Name is wrong';
               break;
            case ErrorTypes.EMAIL_MISSING:
                error_object.message = 'Email is not specified.';
                break;
            case ErrorTypes.INVALID_EMAIL:
                error_object.message = 'Email is wrong.';
                break;
            case ErrorTypes.NO_FILE:
                error_object.message = 'There is no selected file.';
                break;
            case ErrorTypes.PHOTOS_TYPE:
                error_object.message = 'The selected file is not photo';
                break;
            case ErrorTypes.UPLOADING_ERROR:
                error_object.message = 'Uploading error';
                break;
            case ErrorTypes.AVATAR_EXIST:
                error_object.message = 'The user most have only one avatar.';
                break;
            case ErrorTypes.NOT_FOUND_DATA:
                error_object.message = 'Data not found.';
                break;
            case ErrorTypes.CONTRACT_VIOLATION:
                error_object.message = 'Get operation contract violation.';
                break;
            case ErrorTypes.INVALID_QUERY:
                error_object.message = 'Invalid queri.';
                break;
            case ErrorTypes.INVALID_DATA:
                error_object.message = 'Data does not exists.';
                break;
        }
        return error_object;
    }
}

module.exports = Utility;
module.exports.ErrorTypes = ErrorTypes;

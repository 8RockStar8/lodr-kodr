const CodeDAO = require('./private/dao');
const Utility = require('./../../services/utility');

const AppConstants = require('./../../settings/constants');


class CodeService {
    getCode(query) {
        query = {author:query.requester} || {};
        return new Promise((resolve, reject) => {
            CodeDAO.getData(query)
                   .populate('author',['name', 'username','role'])
                   .skip(AppConstants.offset)
                   .limit(AppConstants.limit)
                   .then(data =>{
                          resolve(data);
            }).catch(err => {
                reject(Utility.generateErrorMessage(Utility.ErrorTypes.NOT_FOUND_DATA));
            });
        });
    }
    insertCode(query) {
        return new Promise((resolve,reject) => {
            CodeDAO.insertData(query).then(data => {
                resolve(data);
            }).catch(err => {
                reject(Utility.generateErrorMessage(Utility.ErrorTypes.CODE_PERMISSION_DENIED));
            });
        });
    }
    updateCode(id,query) {
        return new Promise((resolve,reject) => {
            CodeDAO.updateData(id,query).then(data => {
                resolve(data);
            }).catch(err => {
                reject(Utility.generateErrorMessage(Utility.ErrorTypes.CODE_UPDATE_ERROR));
            });
        });
    }
    deleteCode(query) {
        return new Promise((resolve,reject) => {
            CodeDAO.deleteData(query).then(data => {
                resolve(data);
            }).catch(err => {
                reject(Utility.generateErrorMessage(Utility.ErrorTypes.CODE_DELETE_ERROR));
            });
        });
    }
}

module.exports = new CodeService();

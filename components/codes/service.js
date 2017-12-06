const CodeDAO = require('./private/dao');
const Utility = require('./../../services/utility');

class CodeService {
    getCode(query) {
        return new Promis((resolve, reject) => {
            CodeDAO.getData(query)
                   .populate('author',['name', 'username','role'])
                   .skip(req.query.offset)
                   .limit(req.query.limit)
                   .then(data =>{
                          resolve(data);
            }).catch(err => {
                reject(Utility.generateErrorMessage(Utility.ErrorTypes.NOT_FOUND_DATA));
            });
        });
    }
    insertCode(query) {
        return new Promis((resolve,reject) => {
            CodeDAO.insertData(query).then(data => {
                resolve(data);
            }).catch(err => {
                reject(Utility.generateErrorMessage(Utility.ErrorTypes.CODE_PERMISSION_DENIED));
            });
        });
    }
    updateCode(id,query) {
        return new Promis((resolve,reject) => {
            CodeDAO.updateData(id,query).then(data => {
                resolve(data);
            }).catch(err => {
                reject(Utility.generateErrorMessage(Utility.ErrorTypes.CODE_UPDATE_ERROR));
            });
        });
    }
    deleteCode(query) {
        return new Promis((resolve,reject) => {
            CodeDAO.deleteData(query).then(data => {
                resolve(data);
            }).catch(err => {
                reject(Utility.generateErrorMessage(Utility.ErrorTypes.CODE_DELETE_ERROR));
            });
        });
    }
}

module.exports = new CodeService();

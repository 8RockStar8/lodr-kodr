const mongoose = require('mongoose');
const conn = require('./../../core/db_connection');
const BaseDAO = require('./../../core/base_dao');
require('./model');

class CodeDAO extends BaseDAO  {
    constructor() {
        super (conn.model('codes'));
    }
}
module.exports = new CodeDAO();

const mongoose = require('mongoose');
require('./model');
const BaseDao = require('./../../core/base_dao');
const con = require('./../../core/db_connection')



class PhotosDao extends BaseDao {
  constructor() {
    super(con.model('photos'));
  }

  /*deleteData(query) {
    if (!query) {
      return res.send(Utility.generateErrorMessage(
        Utility.ErrorTypes.INVALID_QUERY)
      );
    }
    con.model('photos').findOne(query, (err, data) => {
         if (err) {
            return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.PHOTO_DELETE_ERROR));
         }
         let filename = data.title;
         fs.unlink('./resources/{filename}'.replace('{filename}',filename), (err)=> {
             if(err) {
               return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.PHOTO_DELETE_ERROR));
             }
         })
         con.model('photos').findOneAndRemove(query)

    })
}/*/
}

module.exports = new PhotosDao();

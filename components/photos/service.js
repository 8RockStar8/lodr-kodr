const PhotosDao = require('./private/dao');
const Utility = require('./../../services/utility');
const PhotosResponse = require('./private/response');
const AppConstants = require("./../../settings/constants")
class PhotosService {

  // Read operation
  getPhotos(options) {
      return new Promise((resolve, reject) => {
        options = options || {};
          PhotosDao.getData(options)
                   .populate('author',['name', 'username', 'age', 'role'])
                   .then(data => {
                      resolve(data);
                   })
                   .catch(err => {
                      reject(Utility.generateErrorMessage(
                        Utility.ErrorTypes.NOT_FOUND_DATA)
                      );
                  });
      });
  }

  //Create operation
  insertPhotos(photo) {

      if (!AppConstants.PHOTOS_TYPE.test(photo.originalname)) {
          return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.NO_PHOTOS_TYPE))
      }

      return new Promise((resolve, reject) => {
          PhotosDao.insertData(photo).then(data => {
              resolve(data);
          }).catch(err => {
            reject(Utility.generateErrorMessage(
              Utility.ErrorTypes.PHOTO_CREATION_ERROR)
            );
          });
      });
  }

  //Delete operation
  deletePhotos(photo) {
    return new Promise((resolve, reject) => {
        PhotosDao.deleteData(photo).then(data => {
            resolve(PhotosResponse.generateResponse(data, options.requester));
        }).catch(err => {
          reject(Utility.generateErrorMessage(
            Utility.ErrorTypes.PHOTO_DELETE_ERROR)
          );
        });
    });
  }
}




module.exports = new PhotosService();

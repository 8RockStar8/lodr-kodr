const PhotosDao = require('./private/dao');
const Utility = require('./../../services/utility');
const PhotosResponse = require('./private/response');

class PhotosService {

  // Read operation
  getPhotos(options) {
      return new Promise((resolve, reject) => {
        options = options || {};
          PhotosDao.getData()
                   .populate('author',['name', 'username', 'age', 'role'])
                   .then(data => {
                      resolve(PhotosResponse.generateResponse(data, options.requester));
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
      return new Promise((resolve, reject) => {
          PhotosDao.insertData({
                author: photo.author,
                content_type: photo.content_type,
                size: photo.size,
                title: photo.title,
                image: photo.image,
                width: photo.width,
                height: photo.height,
                path: photo.path
          }).then(data => {
              resolve(PhotosResponse.generateResponse(data, options.requester));
          }).catch(err => {
            reject(Utility.generateErrorMessage(
              Utility.ErrorTypes.PHOTO_CREATION_ERROR)
            );
          });
      });
  }

  //Delete operation
  deleteUsers(photo) {
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

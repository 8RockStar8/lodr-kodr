const express = require('express');
const PhotosRouter = express.Router();
const PhotosService = require('./service');
const Utility = require('./../../services/utility');
// const CheckAvatar = require('./private/middleware');

const fs = require('fs');
const multer = require('multer');
const sizeof = require('image-size');
const upload = multer({ dest: 'resources/'});


// Read operation
PhotosRouter.get('/:id', /*auth._auth('user'), */(req, res) => {
    if(!req.query.key) {
        return res.send(Utility.generateErrorMessage(
          Utility.ErrorTypes.PHOTO_PERMISSION_DENIED)
        );
    }
    let user = {
      id: req.params.id
    };
    let options = {
      requester: req.user
    }
    PhotosService.getPhotos(user, options).then(data => {
        return res.send(data);
    });
});

//Create operation
PhotosRouter.post('/', /*auth._auth('optional'),*/ upload.single('avatar'), (req, res) => {
    // if (!req.query.key) {
    //     return res.send(Utility.generateErrorMessage(
    //       Utility.ErrorTypes.PHOTO_PERMISSION_DENIED)
    //     );
    // }
    if (!req.file) {
        console.log(req.file)
        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.NO_FILE));
    }
    if (!AppConstants.PHOTOS_TYPE.test(req.file.originalname)) {
        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.NO_PHOTOS_TYPE))
    }
    let dimensions = sizeof('{dest}/{filename}'.replace('{dest}',req.file.destination)
                    .replace('{filename}',req.file.filename));
    let photo = {
          author:req.user._id,
          content_type: req.file.mimetype,
          size: req.file.size,
          title: req.file.filename,
          image: req.file.buffer,
          width: dimensions.width,
          height: dimensions.height,
          path: req.file.path
    }
    PhotosService.insertPhotos(photo).then(data => {
        return res.send(data);
    });

});


//Delete operation
PhotosRouter.delete('/:id', /*auth._auth('user'),*/ (req, res) => {
    PhotosService.deletePhotos({_id: id, author: req.user_id}).then(data => {
        return res.send(data);
    })
})

module.exports = PhotosRouter;

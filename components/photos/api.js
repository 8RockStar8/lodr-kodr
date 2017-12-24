const express = require('express');
const fs = require('fs');
const multer = require('multer');
const sizeof = require('image-size');
const Base64 = require('base-64');
const upload = multer({ dest: 'resources/'});
const PhotosRouter = express.Router();
const PhotosService = require('./service');
const Utility = require('./../../services/utility');
const base64 = require("./../authorization/photo_service");
const auth = require('./../authorization/user_service');

// Read operation
PhotosRouter.get('/', auth._auth('user'), (req, res) => {

    PhotosService.getPhotos().then(data => {
        return res.send(data);
    });
});

//Create operation
PhotosRouter.post('/:id', auth._auth('optional'), upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.NO_FILE));
    }

    let img = base64.encode(req.file.path);
    let dimensions = sizeof('{dest}/{filename}'.replace('{dest}',req.file.destination)
                    .replace('{filename}',req.file.filename));
    let photo = {
          originalname: req.file.originalname,
          author: req.params.id,
          content_type: req.file.mimetype,
          size: req.file.size,
          title: req.file.filename,
          image: img,
          width: dimensions.width,
          height: dimensions.height,
          path: req.file.path
    }
    PhotosService.insertPhotos(photo).then(data => {
        return res.send(data);
    });

});


//Delete operation
PhotosRouter.delete('/:id', auth._auth('user'),(req, res) => {
    PhotosService.deletePhotos({_id: req.params.id, author: req.user_id}).then(data => {
        return res.send(data);
    })
})

module.exports = PhotosRouter;

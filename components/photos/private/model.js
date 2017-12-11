const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const AppConstants = require('./../../../settings/constants');

let PhotosSchema = Schema({
  author: {
    ref: 'users',
    type: Schema.ObjectId,
    index: true
  },
  image: {
    type: Buffer,
    index: {unique: true}
  },
  content_type: {
    type: String
  },
  size: {
    type:Number
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  title: {
    type: String
  },
  path: {
    type: String
  },
  uploading_date: {
    type: Date,
    index: true,
    default: Date.now
  }
});

module.exports = mongoose.model('photos', PhotosSchema);

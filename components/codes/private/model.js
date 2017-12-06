const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let codeSchema = Schema({
    content: {
        type: String,
        default: null
    },
    language: {
        type: String,
        enum: ['c++', 'node.js', 'javascript', 'c#'],
        default: 'c++'
    },
    author: {
        ref: 'users',
        type: Schema.ObjectId,
        index: true
    },
    team: {
        type: String,
        default: null
    },
    date: {
      type: Date,
      default: Date.now(),
      index: true
    }
});
module.exports = mongoose.model('codes',codeSchema);

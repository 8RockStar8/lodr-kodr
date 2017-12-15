const fs = require('fs');
const Base64 = require('base-64');
const utf8 = require('utf8');


class base64 {
    encode(file) {
      var bitmap = fs.readFileSync(file);
      return new Buffer(bitmap).toString('base64');
}

    decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);
    return file;
  }
}

module.exports = new base64();

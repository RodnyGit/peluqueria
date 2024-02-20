var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    data: {
      type: Buffer,
      required: true
    },
    contentType: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('imageSchema', imageSchema);

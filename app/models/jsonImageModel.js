var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const jsonImageSchema = new Schema({
    imagen: {
      type: String,
      required: true
    },
    worker: {
      type: String,
      required: true
    },
    client: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('jsonImageSchema', jsonImageSchema);

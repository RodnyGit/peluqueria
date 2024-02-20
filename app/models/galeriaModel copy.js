var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var galeriaSchema = new Schema({
	data: Buffer,
	contentType: String
});

module.exports = mongoose.model('galeria', galeriaSchema);

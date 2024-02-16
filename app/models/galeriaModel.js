var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var galeriaSchema = new Schema({
	nombreClienta: {
		type: String,
		required: true
	},
	nombreWorker: {
		type: String,
		required: true
	},
	data: {
		type: Array,
		required: true
	},
	fecha: {
		type: String,
		required: true
	},

});

module.exports = mongoose.model('galeria', galeriaSchema);

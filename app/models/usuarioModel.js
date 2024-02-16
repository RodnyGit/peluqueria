var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	correo: {
		type: String,
		required: true
	},
	grupo: {
		type: String,
		required: true
	},
	tipo: {
		type: String,
		required: true
	},

});

module.exports = mongoose.model('usuario', usuarioSchema);

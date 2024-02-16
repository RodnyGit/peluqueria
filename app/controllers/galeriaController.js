var Galeria = require('../models/galeriaModel');

let listar = (req, res) => {
	Galeria.find({}, (err, imagenesList) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
		return res.status(200).json({
			ok: true,
			imagenesList
		});
	});
};

let obtenerById = (req, res) => {
	Galeria.findById(req.params.id, (err, user) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
		return res.status(200).json({
			ok: true,
			user
		});
	});
};

let agregar = (req, res) => {
	// create a new user
	let newImage = new Galeria({
		nombreWorker: req.body.nombreWorker,
		nombreClienta: req.body.nombreClienta,
		fecha: req.body.fecha,
		data: req.body.data
	});
	console.log(newImage);	
	newImage.save((err, image) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
		return res.status(200).json({
			ok: true,
			newImage: image
		});
	});
};

let actualizar = (req, res) => {
	Galeria.findById(req.body.id, (err, image) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
		image.nombreWorker = req.body.nombreWorker;
		image.nombreClienta = req.body.nombreClienta;
		image.fecha = req.body.fecha;
		image.data = req.body.data;
		image.save((err, updatedImage) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}
			return res.status(200).json({
				ok: true,
				image: updatedImage
			});
		});
	});
};
let eliminar = (req, res) => {
	Galeria.findById(req.body.id, (err, user) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
		user.remove((err, removedImage) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}
			return res.status(200).json({
				ok: true,
				usuario: removedImage
			});
		});
	});
}; //nombre: req.body.nombre, email: req.body.email, password: req.body.password

module.exports = {
	listar,
	obtenerById,
	agregar,
	actualizar,
	eliminar
};

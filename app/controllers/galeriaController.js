var Image = require('../models/imageModel');

let listar = (req, res) => {
	Image.find({}, (err, imagenesList) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
		else {
			console.log(imagenesList);
			return res.status(200).json({
				ok: true,
				imagenesList
			});
		}
	});
};

let obtenerById = (req, res) => {
	Image.findById(req.params.id, (err, image) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
		else {
			const base64String = image.data.toString('base64');
			const dataUrl = `data:${image.contentType};base64,${base64String}`;
			return res.status(200).json({
				ok: true,
				image: dataUrl
			});
		}
	});
};

let agregar = (req, res) => {
	const newImage = new Image();
	console.log(req.headers);
	newImage.data = req.body;
	newImage.contentType = req.headers['content-type'];
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
	Image.findById(req.body.id, (err, image) => {
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
	Image.findById(req.body.id, (err, image) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
		image.remove((err, removedImage) => {
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

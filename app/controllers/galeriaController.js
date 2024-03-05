var JsonImage = require('../models/jsonImageModel');


let listarJsonImages = (req, res) => {
	JsonImage.find({}, (err, imagenesList) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}
		else {
			return res.status(200).json({
				ok: true,
				imagenesList
			});
		}
	});
};

let agregarJsonImage = (req, res) => {
	const imageData = req.body.imagen;
	const worker = req.body.worker;
	const client = req.body.client;
	const newImage = new JsonImage({
		imagen: imageData,
		worker: worker,
		client: client
	});
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

module.exports = {
	agregarJsonImage,
	listarJsonImages
};

//#region old images controller
// var Image = require('../models/imageModel');

// let listar = (req, res) => {
// 	Image.find({}, (err, imagenesList) => {
// 		if (err) {
// 			return res.status(400).json({
// 				ok: false,
// 				err
// 			});
// 		}
// 		else {
// 			const imageUrls = imagenesList.map(image => {
// 				const base64String = image.data.toString('base64');
// 				image.data = null;
// 				return `data:${image.contentType};base64,${base64String}`;
// 			});
// 			return res.status(200).json({
// 				ok: true,
// 				imageUrls,
// 				imagenesList
// 			});
// 		}
// 	});
// };

// let obtenerById = (req, res) => {
// 	Image.findById(req.params.id, (err, image) => {
// 		if (err) {
// 			return res.status(400).json({
// 				ok: false,
// 				err
// 			});
// 		}
// 		else {
// 			const base64String = image.data.toString('base64');
// 			const dataUrl = `data:${image.contentType};base64,${base64String}`;
// 			return res.status(200).json({
// 				ok: true,
// 				image: dataUrl
// 			});
// 		}
// 	});
// };

// let agregar = (req, res) => {
// 	const newImage = new Image();
// 	newImage.data = req.body;
// 	newImage.contentType = req.headers['content-type'];
// 	newImage.save((err, image) => {
// 		if (err) {
// 			return res.status(400).json({
// 				ok: false,
// 				err
// 			});
// 		}
// 		return res.status(200).json({
// 			ok: true,
// 			newImage: image
// 		});
// 	});
// };


// let actualizar = (req, res) => {
// 	Image.findById(req.body.id, (err, image) => {
// 		if (err) {
// 			return res.status(400).json({
// 				ok: false,
// 				err
// 			});
// 		}
// 		image.nombreWorker = req.body.nombreWorker;
// 		image.nombreClienta = req.body.nombreClienta;
// 		image.fecha = req.body.fecha;
// 		image.data = req.body.data;
// 		image.save((err, updatedImage) => {
// 			if (err) {
// 				return res.status(400).json({
// 					ok: false,
// 					err
// 				});
// 			}
// 			return res.status(200).json({
// 				ok: true,
// 				image: updatedImage
// 			});
// 		});
// 	});
// };
// let eliminar = (req, res) => {
// 	Image.findById(req.body.id, (err, image) => {
// 		if (err) {
// 			return res.status(400).json({
// 				ok: false,
// 				err
// 			});
// 		}
// 		image.remove((err, removedImage) => {
// 			if (err) {
// 				return res.status(400).json({
// 					ok: false,
// 					err
// 				});
// 			}
// 			return res.status(200).json({
// 				ok: true,
// 				usuario: removedImage
// 			});
// 		});
// 	});
// }; //nombre: req.body.nombre, email: req.body.email, password: req.body.password
//#endregion



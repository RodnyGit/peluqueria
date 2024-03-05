var express = require('express');
var router = express.Router();
var galeriaController = require('../controllers/galeriaController');

router.post('/addJsonImage', galeriaController.agregarJsonImage);
router.post('/listarJsonImages', galeriaController.listarJsonImages);
// router.post('/listarGaleria', galeriaController.listar);
// router.post('/addGaleria', galeriaController.agregar);

module.exports = router;

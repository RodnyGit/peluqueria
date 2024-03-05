var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/usuarioController');

router.get('/usuario', usuarioController.listar);
router.post('/usuario', usuarioController.agregar);
router.post('/sugerenciasCorreos', usuarioController.sugerenciasCorreos);
router.get('/usuario/:id', usuarioController.obtenerById);
router.post('/actUsuario', usuarioController.actualizar);
router.delete('/usuario/:id', usuarioController.eliminar);
router.post('/login', usuarioController.login);

module.exports = router;

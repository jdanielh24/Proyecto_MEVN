const express = require('express');
const router = express.Router();
const valoracionController = require('../controllers/valoracion.controller');

router.get('/', valoracionController.getAllValoraciones);
router.post('/createVal', valoracionController.createValoracion);

module.exports = router;
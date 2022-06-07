const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/registrar-usuario', userController.registrarUsuario);
router.post('/login', userController.login);
router.get('/:id', userController.getUsuario);

module.exports = router;
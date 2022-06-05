const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

//router.get('/users/', userController.getAllPosts);
//router.get('/:id', userController.getPostByID);
router.post('/registrar-usuario', userController.registrarUsuario);
router.post('/login', userController.login);
//router.patch('/:id', upload, userController.updatePost);
//router.delete('/:id', userController.deletePost);

module.exports = router;
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');

// multer middleware
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).single("image");

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostByID);
router.post('/', upload, postController.createPost);
router.patch('/:id', upload, postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
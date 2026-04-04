const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.index);
router.post('/posts/store', postController.store);
router.delete('/posts/delete/:id', postController.deletePost); // Phương thức DELETE

module.exports = router;
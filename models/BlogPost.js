const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Tự động lưu ngày đăng bài
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
const BlogPost = require('../models/BlogPost');

// Hiển thị trang chủ và danh sách bài viết
exports.index = async (req, res) => {
    const posts = await BlogPost.find({}).sort({ createdAt: -1 }); // Mới nhất lên đầu
    res.render('index', { posts });
};

// Lưu bài viết mới
exports.store = async (req, res) => {
    await BlogPost.create(req.body);
    res.redirect('/');
};

// Xóa bài viết
exports.deletePost = async (req, res) => {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.redirect('/');
};
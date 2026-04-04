const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/happy_blog')
    .then(() => console.log('Đã kết nối MongoDB thành công! 🦄'))
    .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Cấu hình Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Đã sửa lỗi đường dẫn
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Bắt buộc có để dùng PUT/DELETE

// Model Bài viết
const Post = mongoose.model('Post', new mongoose.Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
}));

// --- ROUTES ---

// 1. Trang chủ
app.get('/', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render('index', { posts });
});

// 2. Lưu bài viết mới
app.post('/posts/store', async (req, res) => {
    await Post.create(req.body);
    res.redirect('/');
});

// 3. Trang Giao diện Sửa
app.get('/posts/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('edit', { post });
});

// 4. CẬP NHẬT (Sửa lỗi router thành app)
app.put('/posts/update/:id', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

// 5. XÓA (Sửa lỗi router thành app)
app.delete('/posts/delete/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT} 🚀`);
});
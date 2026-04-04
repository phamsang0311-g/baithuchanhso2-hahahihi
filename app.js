const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// 1. Kết nối Database
mongoose.connect('mongodb://localhost:27017/my_happy_blog')
    .then(() => console.log('✅ Kết nối Database thành công!'))
    .catch(err => console.error('❌ Lỗi kết nối:', err));

// 2. Cấu hình View và Folder tĩnh
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 3. Middleware xử lý dữ liệu Form và Method-Override
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); // Giúp Form hiểu được lệnh DELETE/PUT

// 4. Model bài viết
const Post = mongoose.model('Post', new mongoose.Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
}));

// 5. CÁC ĐƯỜNG DẪN (Dùng 'app' thay vì 'router' để tránh lỗi dòng 59)

// Trang chủ hiển thị danh sách
app.get('/', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render('index', { posts });
});

// Lưu bài viết mới
app.post('/posts/store', async (req, res) => {
    await Post.create(req.body);
    res.redirect('/');
});

// Mở trang Sửa (Cần file views/edit.ejs)
app.get('/posts/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('edit', { post });
});

// Cập nhật bài viết sau khi sửa (Sửa từ router thành app)
app.put('/posts/update/:id', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

// Xóa bài viết (Sửa dòng 59 từ router.delete thành app.delete)
app.delete('/posts/delete/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// 6. Chạy Server
app.listen(3000, () => {
    console.log('🚀 Server đã sẵn sàng tại http://localhost:3000');
});
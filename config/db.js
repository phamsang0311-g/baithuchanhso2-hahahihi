const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Kết nối đến MongoDB cục bộ
        await mongoose.connect('mongodb://127.0.0.1:27017/baithuchanhso5');
        console.log('✅ Kết nối MongoDB thành công!');
    } catch (err) {
        console.error('❌ Lỗi kết nối:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

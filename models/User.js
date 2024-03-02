// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Добавляем поле "роль"
    createdAt: { type: Date, default: Date.now }
});

// Хеширование пароля перед сохранением в базу данных
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
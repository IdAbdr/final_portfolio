// middleware/authMiddleware.js
const isAdmin = (req, res, next) => {
    if (req.user && req.user.username === 'saida') {
        next(); // Пользователь является администратором, продолжаем выполнение запроса
    } else {
        res.status(403).send('Access denied'); // Отказано в доступе
    }
};

module.exports = {
    isAdmin
};
const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/PortfolioItem');

// Маршрут для страницы администратора
router.get('/admin', (req, res) => {
    // Рендеринг страницы администратора
});

// Маршрут для добавления нового элемента портфолио
router.post('/admin/portfolio/add', async(req, res) => {
    try {
        const { name, description, images } = req.body;
        const newItem = new PortfolioItem({ name, description, images });
        await newItem.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при добавлении элемента портфолио');
    }
});

// Маршрут для редактирования элемента портфолио
router.post('/admin/portfolio/edit/:id', async(req, res) => {
    // Обработка отправки формы для редактирования элемента портфолио
});

// Маршрут для удаления элемента портфолио
router.post('/admin/portfolio/delete/:id', async(req, res) => {
    // Обработка отправки формы для удаления элемента портфолио
});

module.exports = router;
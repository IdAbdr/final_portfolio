// models/PortfolioItem.js
const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
    pictures: [String], // массив URL изображений
    names: [{
        language: String,
        name: String
    }],
    descriptions: [{
        language: String,
        description: String
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
});

const PortfolioItem = mongoose.model('PortfolioItem', portfolioItemSchema);

module.exports = PortfolioItem;
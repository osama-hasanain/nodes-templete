const mongoose = require('mongoose');

// 1- create Schema
const categorySchema = new mongoose.Schema({
    name: String,
})

// 2- create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
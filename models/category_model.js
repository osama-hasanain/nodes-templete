const mongoose = require('mongoose');

// 1- create Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: [true, 'Category name must be unique'],
        trim: true,
        minlength: [3, 'Category name must be at least 3 characters'],
        maxlength: [35, 'Category name must be less than 50 characters'],
    },
    // A and B => xxx.com/a-and-b
    slug: {
        type: String,
        lowercase: true,
    },
    image: String,
},
{
    timestamps: true,
},)

// 2- create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
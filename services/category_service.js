const Category = require('../models/category_model');
const slugify = require('slugify');
const ApiError = require('../utils/api_error');
const asyncHandler = require('express-async-handler')

// @desc Get all categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async(req,res)=>{
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;
    const categories = await Category.find({}).skip(skip).limit(limit);
    res.status(200).json({
        success: true,
        message: 'Categories fetched successfully',
        count: categories.length,
        categories: categories,
    });
});


// @desc Get a specific category
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = asyncHandler(async(req,res,next)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        return next(new ApiError('Category not found', 404));
    }
    return res.status(200).json({
        success: true,
        message: 'Category fetched successfully',
        category: category,
    });
});

// @desc Delete a specific category
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const category = await Category.findByIdAndDelete(id);
    if(!category){
        return next(new ApiError('Category not found', 404));
    }
    return res.status(204).json({
        success: true,
        message: 'Category deleted successfully',
    });
});

// @desc Update a specific category
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const {name} = req.body;
    const category = await Category.findOneAndUpdate({_id: id}, {name,slug: slugify(name)}, { new: true });
    if(!category){
        return next(new ApiError('Category not found', 404));
    }
    res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        category: category,
    });
});

// @desc Create a new category
// @route POST /api/v1/categories
// @access Private
// async function
exports.createCategory = asyncHandler(async(req,res)=>{
    const name = req.body.name;
    const category = await Category.create({ name,slug: slugify(name)});
    res.status(201).json({
        success: true,
        message: 'Category created successfully',
        category: category,
    });
});

// exports.createCategory = (req,res)=>{
//     const name = req.body.name;
//     Category.create({ name,slug: slugify(name)}).then((category) => {
//         res.status(201).json({
//             success: true,
//             message: 'Category created successfully',
//             category: category,
//         });
//     }).catch((err) => {
//         res.status(400).json({
//             success: false,
//             message: 'Category not created',
//             error: err.message,
//         });
//     });
// }
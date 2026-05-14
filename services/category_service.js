const CategoryModel = require('../models/category_model');

exports.getCategories = (req,res)=>{
    const name = req.body.name;
    console.log(req.body);

    const newCategory = new CategoryModel({ name });
    newCategory.save().then((category) => {
        res.json(category);
    }).catch((err) => {
        res.json(err);
    });
}
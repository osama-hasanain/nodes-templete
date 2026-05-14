const express = require('express');
const {param,validationResult} = require('express-validator');
const router = express.Router();
const {getCategories,createCategory,getCategory,updateCategory,deleteCategory} = require('../services/category_service');

router.route('/').get(getCategories).post(createCategory);
router.
route('/:id')
.get(
    param('id').isMongoId().withMessage('Invalid category id'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
    ,
    getCategory
)
.put(updateCategory)
.delete(deleteCategory);

module.exports = router;
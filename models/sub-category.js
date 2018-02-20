"use strict";
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    categoryId: {
        type: String,
        required: false
    }
});


const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;

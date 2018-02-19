"use strict";
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    }
});


const SubCategory = mongoose.model('Sub Category', subCategorySchema);

module.exports = SubCategory;

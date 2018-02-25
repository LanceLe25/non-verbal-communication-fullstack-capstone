"use strict";
const mongoose = require('mongoose');

const cardItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    categoryId: {
        type: String,
        required: false
    },
    subCategoryId: {
        type: String,
        required: false
    }
});


const CardItem = mongoose.model('CardItem', cardItemSchema);

module.exports = CardItem;

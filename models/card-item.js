"use strict";
const mongoose = require('mongoose');

const cardItemSchema = new mongoose.Schema({
    subCategoryId: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    }
});


const CardItem = mongoose.model('CardItem', cardItemSchema);

module.exports = CardItem;

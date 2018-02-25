"use strict";
const mongoose = require('mongoose');

const saveCardSchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: false
    },
    subCategoryId: {
        type: String,
        required: false
    },
    cardItemId: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    }
});


const SaveCard = mongoose.model('SaveCard', saveCardSchema);

module.exports = SaveCard;

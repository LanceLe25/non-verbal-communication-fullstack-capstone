"use strict";
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    }
});


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
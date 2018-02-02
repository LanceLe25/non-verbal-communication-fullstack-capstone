"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const statementSchema = new mongoose.Schema({
    user: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: false
    },
    values: {
        type: String,
        required: false
    },
    beliefs: {
        type: String,
        required: false
    },
    goals: {
        type: String,
        required: false
    },
    dateTime: {
        type: String,
        required: false
    }
});


const Statement = mongoose.model('Statement', statementSchema);

module.exports = Statement;

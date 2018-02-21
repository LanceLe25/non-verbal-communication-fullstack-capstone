'use strict';

const User = require('./models/user');
const Icon = require('./models/icon');
const Category = require('./models/category');
const SubCategory = require('./models/sub-category');
const CardItem = require('./models/card-item');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const morgan = require('morgan');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

mongoose.Promise = global.Promise;


// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}



function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}



// ---------------USER ENDPOINTS-------------------------------------
// POST -----------------------------------
// creating a new user
app.post('/users/create', (req, res) => {
    let username = req.body.username;
    username = username.trim();
    let password = req.body.password;
    password = password.trim();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: 'error 87' + err

                });
            }

            User.create({
                username,
                password: hash,
            }, (err, item) => {
                if (err) {
                    return res.status(500).json({
                        message: 'error 98' + err
                    });
                }
                if (item) {
                    console.log(`User \`${username}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

// signing in a user
app.post('/users/signin', function (req, res) {
    const user = req.body.username;
    const pw = req.body.password;
    User
        .findOne({
            username: req.body.username
        }, function (err, items) {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (!items) {
                return res.status(401).json({
                    message: "Not found!"
                });
            } else {
                items.validatePassword(req.body.password, function (err, isValid) {
                    if (err) {
                        console.log('There was an error validating the password.');
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: "Not found"
                        });
                    } else {
                        var logInTime = new Date();
                        console.log("User logged in: " + req.body.username + ' at ' + logInTime);
                        return res.json(req.body.username);
                    }
                });
            };
        });
});


// -------------category ENDPOINTS------------------------------------------------
//*********************CATEGORY POST AND GET*************************
app.post('/category/create', (req, res) => {

    let name = req.body.name;

    Category.create({
        name
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        } else if (item) {
            console.log(`Category \`${item}\` added.`);
            return res.json(item);
        }

    });
});


app.get('/category/get', function (req, res) {
    Category.find(
        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else if (item.length != 0) {
                res.status(200).json(item);
            } else {
                res.status(200).json("");
            }
        });
});

//*********************SUB-CATEGORY POST AND GET*************************
app.post('/sub-category/create', (req, res) => {

    let name = req.body.name;
    let categoryId = req.body.categoryId;

    SubCategory.create({
        name,
        categoryId
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        } else if (item) {
            console.log(`Sub Category \`${item}\` added.`);
            return res.json(item);
        }

    });
});


app.get('/sub-category/get/:categoryId', function (req, res) {
    //this returns only the SubCategories that are connected with the specific category id
    SubCategory.find({
            categoryId: req.params.categoryId
        },

        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else if (item.length != 0) {
                res.status(200).json(item);
            } else {
                res.status(200).json("");
            }
        });
});

//*********************CARD ITEM POST AND GET*************************
app.post('/card-item/create', (req, res) => {

    let name = req.body.name;
    let subCategoryId = req.body.subCategoryId;

    CardItem.create({
        name,
        subCategoryId
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        } else if (item) {
            console.log(`Card Item \`${item}\` added.`);
            return res.json(item);
        }

    });
});


app.get('/card-item/get/:subCategoryId', function (req, res) {
    //this returns only the SubCategories that are connected with the specific category id
    CardItem.find({
            subCategoryId: req.params.subCategoryId
        },
        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else {
                res.status(200).json(item);
            }
        });
});




//*********************PUT*************************
app.put('/icons/:id', function (req, res) {
    let updateSop = {};
    let updateableFields = ['body'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            updateSop[field] = req.body[field];
        }
    });

    Icon
        .findByIdAndUpdate(req.params.id, {
            $set: updateSop
        }).exec().then(function (icon) {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

//*********************MISC*************************
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;

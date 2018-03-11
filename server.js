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



//*********************CATEGORY ENDPOINTS - POST, GET, PUT, DELETE*************************
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

app.get('/get-category-name-by-id/:id', function (req, res) {
    Category.find({
            _id: req.params.id
        },
        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else {
                res.status(200).json(item[0].name);
            }
        });
});


function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
app.get('/check-category-duplicate-by-name/:name', function (req, res) {
    let inputCategoryName = req.params.name;
    let lowerName = inputCategoryName.toLowerCase();
    let upperName = inputCategoryName.toUpperCase();
    let titleName = toTitleCase(inputCategoryName);

    Category.find({},
        function (err, item) {
            let categoryFound = 0;
            for (let key in item) {
                //                console.log("compare ", item[key].name, " with ", inputCategoryName, " or with ", lowerName, " or with ", upperName, " or with ", titleName);
                //console.log(`${item[key].name}`);
                if (item[key].name == lowerName) {
                    categoryFound++;
                } else if (item[key].name == upperName) {
                    categoryFound++;
                } else if (item[key].name == titleName) {
                    categoryFound++;
                } else if (item[key].name == inputCategoryName) {
                    categoryFound++;
                }
            }
            res.status(200).json(categoryFound);
        });
});

app.put('/update-category/', (req, res) => {

    let categoryName = req.body.name;
    let categoryID = req.body.id;

    Category.findByIdAndUpdate(categoryID, {
        name: categoryName
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        } else if (item) {
            console.log(`Updated Category \`${item}\`.`);
            return res.json(item);
        }

    });
});

app.delete('/delete-category/:categoryId', function (req, res) {
    Category.findByIdAndRemove(req.params.categoryId, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(201).json(items);
    });
});




//*********************SUB-CATEGORY ENDPOINTS - POST, GET, PUT, DELETE*************************
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


app.get('/check-sub-category-duplicate-by-name/:name', function (req, res) {
    let inputSubCategoryName = req.params.name;
    let lowerName = inputSubCategoryName.toLowerCase();
    let upperName = inputSubCategoryName.toUpperCase();
    let titleName = toTitleCase(inputSubCategoryName);

    SubCategory.find({},
        function (err, item) {
            let subCategoryFound = 0;
            for (let key in item) {
                //                console.log("compare ", item[key].name, " with ", inputCategoryName, " or with ", lowerName, " or with ", upperName, " or with ", titleName);
                //console.log(`${item[key].name}`);
                if (item[key].name == lowerName) {
                    subCategoryFound++;
                } else if (item[key].name == upperName) {
                    subCategoryFound++;
                } else if (item[key].name == titleName) {
                    subCategoryFound++;
                } else if (item[key].name == inputSubCategoryName) {
                    subCategoryFound++;
                }
            }
            res.status(200).json(subCategoryFound);
        });
});

app.get('/get-subcategory-name-by-id/:id', function (req, res) {
    SubCategory.find({
            _id: req.params.id
        },
        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else {
                res.status(200).json(item[0].name);
            }
        });
});

app.put('/update-sub-category/', (req, res) => {

    let subCategoryName = req.body.name;
    let subCategoryID = req.body.id;

    SubCategory.findByIdAndUpdate(subCategoryID, {
        name: subCategoryName
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        } else if (item) {
            console.log(`Updated Sub-category \`${item}\`.`);
            return res.json(item);
        }

    });
});

app.delete('/delete-sub-category/:subCategoryId', function (req, res) {
    SubCategory.findByIdAndRemove(req.params.subCategoryId, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(201).json(items);
    });
});




//*********************CARD ITEM ENDPOINTS - POST, GET, PUT, DELETE*************************
app.post('/card-item/create', (req, res) => {

    let name = req.body.name;
    let categoryId = req.body.categoryId;
    let subCategoryId = req.body.subCategoryId;
    let icon = "";

    CardItem.create({
        name,
        icon,
        categoryId,
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

app.get('/card-item/get-by-category/:categoryId', function (req, res) {
    //this returns only the SubCategories that are connected with the specific category id
    CardItem.find({
            categoryId: req.params.categoryId
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

app.put('/update-item/', (req, res) => {

    let itemName = req.body.name;
    let itemID = req.body.id;

    CardItem.findByIdAndUpdate(itemID, {
        name: itemName
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        } else if (item) {
            console.log(`Updated item \`${item}\`.`);
            return res.json(item);
        }

    });
});

app.get('/get-item-name-by-id/:id', function (req, res) {
    CardItem.find({
            _id: req.params.id
        },
        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else {
                res.status(200).json(item[0].name);
            }
        });
});

app.delete('/delete-item/:itemId', function (req, res) {
    CardItem.findByIdAndRemove(req.params.itemId, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(201).json(items);
    });
});


app.get('/check-item-duplicate-by-name/:name', function (req, res) {
    let inputItemName = req.params.name;
    let lowerName = inputItemName.toLowerCase();
    let upperName = inputItemName.toUpperCase();
    let titleName = toTitleCase(inputItemName);

    CardItem.find({},
        function (err, item) {
            let itemFound = 0;
            for (let key in item) {
                //                console.log("compare ", item[key].name, " with ", inputCategoryName, " or with ", lowerName, " or with ", upperName, " or with ", titleName);
                //console.log(`${item[key].name}`);
                if (item[key].name == lowerName) {
                    itemFound++;
                } else if (item[key].name == upperName) {
                    itemFound++;
                } else if (item[key].name == titleName) {
                    itemFound++;
                } else if (item[key].name == inputItemName) {
                    itemFound++;
                }
            }
            res.status(200).json(itemFound);
        });
});





//*********************CARD SAVE POST AND GET*************************
app.post('/save-card/create', (req, res) => {

    let categoryId = req.body.categoryId;
    let subCategoryId = req.body.subCategoryId;
    let icon = "";
    let name = req.body.name;

    CardItem.create({
        icon,
        categoryId,
        subCategoryId,
        name
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        } else if (item) {
            console.log(`Save Card \`${item}\` added.`);
            return res.json(item);
        }

    });
});

app.put('/save-card/update', (req, res) => {

    let icon = req.body.icon;
    let cardItemId = req.body.cardItemId;
    let name = req.body.name;

    CardItem.findByIdAndUpdate(cardItemId, {
        icon: icon
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        } else if (item) {
            console.log(`Updated Card \`${item}\` added.`);
            return res.json(item);
        }

    });
});




//*********************CARD ICON POST AND GET*************************
app.get('/card-icons/get/', function (req, res) {
    Icon.find(function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);
    });
});

app.get('/get - item - icon - by - id/:id', function (req, res) {
    CardItem.find({
            _id: req.params.id
        },
        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            } else {
                res.status(200).json(item[0].icon);
            }
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

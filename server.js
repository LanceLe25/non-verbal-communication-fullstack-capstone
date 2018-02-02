'use strict';

const User = require('./models/user');
const Statement = require('./models/statement');
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


// -------------STATEMENT ENDPOINTS------------------------------------------------
//*********************POST*************************
app.post('/statements/create', (req, res) => {

    let user = req.body.user;
    let body = req.body.body;
    let values = req.body.values;
    let beliefs = req.body.beliefs;
    let goals = req.body.goals;
    var today = new Date();
    var showMonth = (today.getMonth() + 1);
    if (showMonth < 10) {
        showMonth += "0" + showMonth;
    }
    var showDate = today.getDate();
    if (showDate < 10) {
        showDate = "0" + showDate;
    }
    var showHours = today.getHours();
    if (showHours < 10) {
        showHours = "0" + showHours;
    }
    var showMinutes = today.getMinutes();
    if (showMinutes < 10) {
        showMinutes = "0" + showMinutes;
    }
    var showSeconds = today.getSeconds();
    if (showSeconds < 10) {
        showSeconds = "0" + showSeconds;
    }
    var date = today.getFullYear() + '-' + showMonth + '-' + showDate;
    var time = showHours + "-" + showMinutes + "-" + showSeconds;
    var dateTime = date + '-' + time;

    Statement.create({
        user,
        body,
        values,
        beliefs,
        goals,
        dateTime
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
            if (item) {
                console.log(`Statement \`${statement}\` added.`);
                return res.json(item);
            }
        }
    });
});







//*********************GET*************************


app.get('/statements/:user', function (req, res) {
    Statement.find({
            user: req.params.user
        },

        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            if (item.length != 0) {

                let output = (sortByKey(item, 'dateTime'));
                res.status(200).json(output[(output.length - 1)]);
            } else {
                res.status(200).json("");
            }
        });
});


//*********************PUT*************************
app.put('/statements/:id', function (req, res) {
    let updateSop = {};
    let updateableFields = ['body'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            updateSop[field] = req.body[field];
        }
    });

    Statement
        .findByIdAndUpdate(req.params.id, {
            $set: updateSop
        }).exec().then(function (statement) {
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

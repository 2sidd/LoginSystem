var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/login', function(req, res, next) {
    if (req.body.username && req.body.password) {
        User.authenticate(req.body.username, req.body.password, function(error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                var payload = {
                        key: user._id
                    }
                    // JWT token 
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 86400 // expires in 24 hours
                });
                return res.json({
                    token: token,
                    usr: {
                        id: user._id,
                        success: true,
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                });
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

router.post('/register', function(req, res, next) {
    console.log(req.body.firstName);
    if (
        req.body.firstName &&
        req.body.lastName && req.body.email &&
        req.body.username &&
        req.body.password
    ) {

        var userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        User.create(userData, function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.json({ message: 'A verification mail has been sent to your registered mail.' });
            }
        });

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }


});



module.exports = router;
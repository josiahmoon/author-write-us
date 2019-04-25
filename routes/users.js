const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'))
//router.get('https://author-write-us.mybluemix.net/login', (req, res) => res.render('login'))

// Register Page
router.get('/register', (req, res) => res.render('register'))
//router.get('https://author-write-us.mybluemix.net/register', (req, res) => res.render('register'))

// Register Handle
router.post('/register', (req, res) => {
    const { name, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if(!name || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields'});
    }

    // Check if passwords match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match'});
    }

    // Check password length
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters'});
    }

    if(errors.length > 0) {
        res.render('register', {
           errors,
           name,
           password,
           password2
        });
    } else {
        // Validation passed:
        User.findOne({ name: name })
            .then(user => {
                if(user) {
                    // User exists:
                    errors.push({ msg: 'name is already registered'});
                    res.render('register', {
                        errors,
                        name,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        password
                    });

                    // Hash Password
                    bcrypt.genSalt(10, (error, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // Set password to hashed
                        newUser.password = hash;
                        // Save user
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    }))
                }
            });
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
   req.logout();
   req.flash('success_msg', 'You are logged out');
   res.redirect('/users/login');
});

module.exports = router;
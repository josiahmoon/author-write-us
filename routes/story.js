const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');

// Create Page
router.get('/create', (req, res) => res.render('create'))
//router.get('https://author-write-us.mybluemix.net/create', (req, res) => res.render('create'))

// Viewable Stories Page
router.get('/viewables', (req, res) => res.render('viewables'))
//router.get('https://author-write-us.mybluemix.net/viewables', (req, res) => res.render('viewables'))

// Create Handle
router.post('/create', (req, res) => {
    res.redirect('/create');
});

// Viewable Stories Handle
router.post('/viewables', (req, res) => {
    res.redirect('/viewables');
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

// Story Page
router.get('/room', (req, res) => res.render('room'))

// Story Handle
router.post('/room', (req, res) => {
    res.redirect('/room');
});

module.exports = router;
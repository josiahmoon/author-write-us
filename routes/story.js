const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');

// Create Page
router.get('/create', (req, res) => res.render('create'))
//router.get('https://author-write-us.mybluemix.net/create', (req, res) => res.render('create'))

// Join Page
router.get('/join', (req, res) => res.render('join'))
//router.get('https://author-write-us.mybluemix.net/join', (req, res) => res.render('join'))

// Create Handle
router.post('/create', (req, res) => {
    res.redirect('/create');
});

// Join Handle
router.post('/join', (req, res) => {
    res.redirect('/join');
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
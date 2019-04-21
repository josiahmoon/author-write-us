const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');

// Create Page
router.get('/create', (req, res) => res.render('create'))

// Join Page
router.get('/join', (req, res) => res.render('join'))

// Create Handle
router.post('/create', (req, res) => {
    res.redirect('/create');
});

// Join Handle
router.post('/login', (req, res) => {
    res.redirect('/join');
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;

const express = require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));
router.get('https://author-write-us.mybluemix.net/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        name: req.user.name
    }));
router.get('https://author-write-us.mybluemix.net/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        name: req.user.name
    }));

module.exports = router;
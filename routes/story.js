const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var topic = "";

// User model
const User = require('../models/User');

// Create Page
router.get('/create', (req, res) => res.render('create', {topic:topic}))
//router.get('https://author-write-us.mybluemix.net/create', (req, res) => res.render('create'))

// Viewable Stories Page
router.get('/viewables', (req, res) => res.render('viewables'))
//router.get('https://author-write-us.mybluemix.net/viewables', (req, res) => res.render('viewables'))

// Create Handle
router.post('/create', (req, res) => {
    console.log("redirect");
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
router.get('/room', (req, res) => res.render('room', {topic:topic}))

// Room Handle
router.post('/room', (req, res) => {
    res.redirect('/room', {topic:topic});
});

router.post('/topic', (req, res) => {
    topic = req.body.topic;
    console.log(topic);
    if(typeof topic == undefined || topic == "") topic = "Ant man goes up Thanos'...";
    res.render('room', {topic:topic, user:req.user.name});
})

module.exports = router;
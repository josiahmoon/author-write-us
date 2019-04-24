const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
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
    var newChoice = new ChoiceModel();

    res.redirect('/viewables');
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

// Story Page
router.get('/room', (req, res) => res.render('room', {topic:topic, user:req.name}))

// Story Handle
router.post('/room', (req, res) => {
    res.redirect('/room', {topic:topic, user:req.name});
});

router.post('/topic', (req, res) => {
    topic = req.body.topic;
    var name;
    if(typeof topic == undefined || topic == "") topic = "Ant man goes up Thanos'...";
    (req.user == undefined) ? name = "Anonymous" : name = req.user.name;
    res.render('room', {topic:topic, user:name});
})

module.exports = router;

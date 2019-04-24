const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var topic = "";

// Connect to Mongo
const uri = require('../config/keys').MongoURI;
const client = new MongoClient(uri, { useNewUrlParser: true });

// User model
const User = require('../models/User');

// Create Page
router.get('/create', (req, res) => res.render('create', {topic:topic}))
//router.get('https://author-write-us.mybluemix.net/create', (req, res) => res.render('create'))

// Create Handle
router.post('/create', (req, res) => {
    console.log("redirect");
    res.redirect('/create');
});

// Viewable Stories Page
router.get('/viewables', (req, res) => {
    var resultArray = [];
    client.connect(err => {
        var db = client.db('test');
        var cursor = db.collection('stories').find();
            cursor.forEach((doc, err) => {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            client.close();
            res.render('viewables', {items: resultArray});
        });
    });
})
//router.get('https://author-write-us.mybluemix.net/viewables', (req, res) => res.render('viewables'))

// Viewable Stories Handle
router.post('/viewables', (req, res) => {
    res.redirect('/story/viewables');
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
    console.log(req.user.name);
    if(typeof topic == undefined || topic == "") topic = "Ant man goes up Thanos'...";
    res.render('room', {topic:topic, user:req.user.name});
})

// Upload Handle
router.post('/upload', (req, res) => {
    var item = {
        name: req.user.name,
        story: req.body.story
    };

    client.connect(err => {
        var db = client.db('test');
        db.collection('stories').insertOne(item, (err, db) => {
            assert.equal(null, err);
            console.log('Story inserted');
            client.close();
        });
    });
    res.redirect('/story/submitted');
});

// Submitted Handle
router.get('/submitted', (req, res) => res.render('submitted'));

module.exports = router;

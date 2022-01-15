const { Router } = require('express');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get("/", (req, res) => {
    res.render('index');
});

router.get('/ED',(req,res) => {
    res.render('ED');
});

router.get('/info',(req,res) =>{
    res.render('info');
})

router.get('/accueil',(req,res) =>{
    res.render('accueil');
})

router.get('/TiersPayant',(req,res) =>{
    res.render('TiersPayant');
})

// TODO : add a /accueil with good route

router.post('/login',authController.ldap);

module.exports = router;
const { Router } = require('express');
const express = require('express');
const { json } = require('express/lib/response');

const router = express.Router();
const authController = require('../controllers/auth')

router.get("/", (req, res) => {
    res.render('index');
    
});

router.get('/EspaceDemandeur',(req,res) => {
    res.render('ED');
});

router.get('/info',(req,res) =>{
    console.log("i am in info");
    res.render('info');
    
})

router.get('/accueil',(req,res) =>{
    
    res.render('accueil');
})

// TODO : add a /accueil with good route

router.post('/login',authController.ldap);

module.exports = router;
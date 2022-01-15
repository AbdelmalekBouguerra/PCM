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

router.get('/MedecinesDeSoins',(req,res) =>{
    res.render('MedecinesDeSoins');
})

router.get('/PrisesEnCharge100',(req,res) =>{
    res.render('PrisesEnCharge100');
})

router.get('/CMS',(req,res) =>{
    res.render('CMS');
})

// TODO : add a /accueil with good route

router.post('/login',authController.ldap);

module.exports = router;
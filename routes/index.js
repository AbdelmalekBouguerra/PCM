const { Router } = require('express');
const express = require('express');
const router = express.Router();
const DPC = require('../controllers/getDPC');


const authController = require('../controllers/auth')

router.get("/", (req, res) => {
    if (req.session.isAuth) res.render('accueil');
    else res.render('index');
});

router.get('/EspaceDemandeur',DPC.espaceDemandeur);

router.get('/info',(req,res) =>{
    if (req.session.isAuth) res.render('info');   
    else res.render('index'); 
})


router.route('/accueil')
    .get((req,res) =>{
        if (req.session.isAuth) res.render('accueil');   
        else res.render('index');
    })
    .post(authController.login);

// TODO : add a /accueil with good route


module.exports = router;
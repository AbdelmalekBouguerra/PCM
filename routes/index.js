const { Router } = require('express');
const express = require('express');
const router = express.Router();
const DPC = require('../controllers/DPC');


const authController = require('../controllers/auth')

router.get("/", (req, res) => {
    if (req.session.isAuth) res.render('accueil');
    else res.render('index');
});


router.route('/EspaceDemandeur')
    .get(DPC.get)
    .post(DPC.post)

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
const express = require('express');
const router = express.Router();

router.get('/tiersPayant',(req,res) =>{
    res.render('prestation/tiersPayant');
})

router.get('/medecinesDeSoins',(req,res) =>{
    res.render('prestation/medecinesDeSoins');
})

router.get('/prisesEnCharge100',(req,res) =>{
    res.render('prestation/prisesEnCharge100');
})

router.get('/CMS',(req,res) =>{
    var err = 1/0;
    res.render('prestation/CMS');
})

module.exports = router;
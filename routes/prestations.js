const express = require('express');
const router = express.Router();

router.get('/TiersPayant',(req,res) =>{
    res.render('Prestations/TiersPayant');
})

router.get('/MedecinesDeSoins',(req,res) =>{
    res.render('Prestations/MedecinesDeSoins');
})

router.get('/PrisesEnCharge100',(req,res) =>{
    res.render('Prestations/PrisesEnCharge100');
})

router.get('/CMS',(req,res) =>{
    res.render('CMS');
})

module.exports = router;
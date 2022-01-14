const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get("/", (req, res) => {
    res.render('index');
});

router.get('/ED',(req,res) => {
    res.render('ED');
});

router.post('/login',authController.ldap);

module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/tiersPayant", auth, (req, res) => {
  res.render("prestation/tiersPayant");
});

router.get("/medecinesDeSoins", auth, (req, res) => {
  res.render("prestation/medecinesDeSoins");
});

router.get("/prisesEnCharge100", auth, (req, res) => {
  res.render("prestation/prisesEnCharge100");
});

router.get("/CMS", auth, (req, res) => {
  res.render("prestation/CMS");
});

module.exports = router;

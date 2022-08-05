const express = require("express");
const router = express.Router();
const DPC = require("../controllers/DPC");
const auth = require("../middleware/auth");
const authController = require("../controllers/auth");

router.get("/", auth, (res) => {
  res.render("accueil");
});

router.route("/EspaceDemandeur").get(auth, DPC.get).post(auth, DPC.post);

router.get("/info", auth, (req, res) => {
  if (req.session.isAuth) res.render("info");
  else res.render("index");
});

router
  .route("/accueil")
  .get(auth, (req, res) => {
    if (req.session.isAuth) res.render("accueil");
    else res.render("index");
  })
  .post(auth, authController.login);

module.exports = router;

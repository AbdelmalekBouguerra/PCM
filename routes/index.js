const express = require("express");
const router = express.Router();
const DPC = require("../controllers/DPC");
const auth = require("../middleware/auth");
const authController = require("../controllers/auth");

router.get("/", (req, res) => {
  res.render("index");
});

router.route("/EspaceDemandeur").get(auth, DPC.get).post(auth, DPC.post);

router.get("/info", auth, (req, res) => {
  res.render("info");
});

router
  .route("/accueil")
  .get(auth, (req, res) => {
    res.render("accueil");
  })
  .post(authController.login);

module.exports = router;

const express = require("express");
const router = express.Router();
const DPC = require("../controllers/DPC");
const auth = require("../middleware/auth");
const authController = require("../controllers/auth");
const structures = require("../controllers/form-data/structure");
const data = require("../controllers/form-data/act");

router.get("/", (req, res) => {
  res.render("index");
});

router.route("/EspaceDemandeur").get(auth, DPC.get).post(auth, DPC.post);

router.get("/info", auth, (req, res) => {
  res.render("info");
});

router.get("/get/structure", auth, structures.sh);
router.get("/get/act", auth, data.actType);
router.get("/get/act/:actCode", auth, data.actCode);
router.get("/get/structure/tp/:designation", auth, structures.tiersPayant);

router
  .route("/accueil")
  .get(auth, (req, res) => {
    res.render("accueil");
  })
  .post(authController.login);

router.get("/disconnect", authController.disconnect);

module.exports = router;

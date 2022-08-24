const express = require("express");
const router = express.Router();
const DPC = require("../controllers/DPC");
const auth = require("../middleware/auth");
const authController = require("../controllers/auth");
const structures = require("../controllers/form-data/structure");
const medecins_soin = require("../controllers/form-data/medecins_soin.js");
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
router.get("/get/structure/medecinTravailAct", auth, structures.medecinTravail);
router.get(
  "/get/structure/mt/:designation",
  auth,
  structures.medecinTravailStr
);

// medecins_soin
router.get(
  "/get/medecins_conventionnes/specialites",
  auth,
  medecins_soin.specialite
);
router.get(
  "/get/medecins_conventionnes/:specialite/wilayas",
  auth,
  medecins_soin.wilaya
);
router.get(
  "/get/medecins_conventionnes/:specialite/:wilaya/medecin",
  auth,
  medecins_soin.medecin
);

router
  .route("/accueil")
  .get(auth, (req, res) => {
    res.render("accueil");
  })
  .post(authController.login);

router.get("/disconnect", authController.disconnect);

module.exports = router;

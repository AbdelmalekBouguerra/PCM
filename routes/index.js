const express = require("express");
const router = express.Router();
const DPC = require("../controllers/DPC");
const auth = require("../middleware/auth");
const authController = require("../controllers/auth");
const structures = require("../controllers/form-data/structure");
const medecins_soin = require("../controllers/form-data/medecins_soin.js");
const data = require("../controllers/form-data/act");
const cms = require("../controllers/form-data/cms");
router.get("/", (req, res) => {
  res.render("index");
});

router.route("/EspaceDemandeur").get(auth, DPC.get).post(auth, DPC.post);

router.get("/info", auth, (req, res) => {
  res.render("info");
});

router.get("/structure", auth, (req, res) => {
  res.render("structure");
});

router.get("/get/structure", structures.sh);
router.get("/get/act", data.actType);
router.get("/get/act/:actCode", data.actCode);
router.get("/get/structure/tp/:designation", structures.tiersPayant);
router.get("/get/structure/medecinTravailAct", structures.medecinTravail);
router.get(
  "/get/structure/mt/:designation",

  structures.medecinTravailStr
);

// medecins_soin
router.get(
  "/get/medecins_conventionnes/specialites",

  medecins_soin.specialite
);
router.get(
  "/get/medecins_conventionnes/:specialite/wilayas",

  medecins_soin.wilaya
);
router.get(
  "/get/medecins_conventionnes/:specialite/:wilaya/medecin",

  medecins_soin.medecin
);

// cms
router.get("/get/cms/specialites", cms.specialite);
router.get("/get/cms/:specialite/structure", cms.structure);

router
  .route("/accueil")
  .get(auth, (req, res) => {
    res.render("accueil");
  })
  .post(authController.login);

router.get("/disconnect", authController.disconnect);

module.exports = router;

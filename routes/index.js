const { Router } = require("express");
const express = require("express");
const router = express.Router();
const DPC = require("../controllers/DPC");
const fs = require("fs");
const path = require("path");
const authController = require("../controllers/auth");
const multer = require("multer");



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // creating folder for each demande.
    // check if the folder exists.
    if (!fs.existsSync("public/demande/" + req.session.idDem)) fs.mkdirSync("public/demande/" + req.session.idDem);
    cb(null, "public/demande/" + req.session.idDem);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.substring(0, file.originalname.lastIndexOf(".")) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

var uploadMultiple = upload.fields([{ name: "file1", maxCount: 10 }]);

router.get("/", (req, res) => {
  if (req.session.isAuth) res.render("accueil");
  else res.render("index");
});

// router.route("/EspaceDemandeur").get(DPC.get).post(DPC.post);
router.post("/EspaceDemandeur", uploadMultiple, DPC.post);
router.get("/EspaceDemandeur", DPC.get);

router.get("/info", (req, res) => {
  if (req.session.isAuth) res.render("info");
  else res.render("index");
});

router.get("/test", (req, res) => {
  if (req.session.isAuth) res.render("test");
  else res.render("index");
});

router
  .route("/accueil")
  .get((req, res) => {
    if (req.session.isAuth) res.render("accueil");
    else res.render("index");
  })
  .post(authController.login);

// TODO : add a /accueil with good route

module.exports = router;

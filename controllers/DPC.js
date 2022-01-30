const db = require("../env/db");
const style = require("../env/chalk");
const validator = require("validator");
const date = require("./date");

var table = [];
function getDemandeTable(userId, callback) {
  db.execute(
    "SELECT * FROM DPC WHERE ID_DEMANDEUR = ?;",
    [userId],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    }
  );
}
function setBENE(
  bene,
  benenom,
  beneprenom,
  dateNais,
  lienparentie,
  userID,
  callback
) {
  //  check if "Ayant droit" option selected
  if (bene == "L’adhérent") return false;
  console.log("starting setBENE");
  const parm = [userID, benenom, beneprenom, dateNais, lienparentie];
  console.log("🚀 ~ file: DPC.js ~ line 25 ~ setBENE ~ parm", parm);

  db.execute(
    "INSERT INTO BÉNÉFICIAIRE(ID_DEMANDEUR,NOM,PRENOM,DATE_NAIS,LIEN_PARENTE) VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE NOM = ?, PRENOM = ?, DATE_NAIS = ? , LIEN_PARENTE = ? ;",
    [
      userID,
      benenom,
      beneprenom,
      dateNais,
      lienparentie,
      benenom,
      beneprenom,
      dateNais,
      lienparentie,
    ],
    (err, results) => {
      if (err) console.log("setBENE ~ DPC.js SQL error :", err);
      else {
        callback(results);
        console.log("🚀 ~ file: DPC.js ~ line 52 ~ results", results);
        console.log("am done inserting to db");
      }
    }
  );
}

function setDEMA(username, nom, prenom, matricule, tele, email) {
  db.query(
    "INSERT INTO DEMANDEUR(USERNAME,NOM,PRENOM,MATRICULE,TEL,MAIL) VALUES(?,?,?,?,?,?) ON DUPLICATE KEY UPDATE USERNAME = ?,NOM = ?,PRENOM = ?,MATRICULE = ?,TEL = ?,MAIL = ?",
    [
      username,
      nom,
      prenom,
      matricule,
      tele,
      email,
      username,
      nom,
      prenom,
      matricule,
      tele,
      email,
    ],
    (err) => {
      if (err) throw err;
    }
  );
}
function setDPC(
  userID,
  benenom,
  beneprenom,
  dateNais,
  typePrestation,
  callback
) {
  //check if benenom is not undefined
  if (typeof benenom !== "undefined") {
    db.execute(
      "INSERT INTO DPC(ID_DEMANDEUR,ID_BENEFICIAIRE,TYPE_DEMANDE,DATE_DEM) VALUES(?,(SELECT ID FROM BÉNÉFICIAIRE WHERE ID_DEMANDEUR = ? AND NOM = ? AND PRENOM = ? AND DATE_NAIS = ?),?,?)",
      [userID, userID, benenom, beneprenom, dateNais, typePrestation, date()],
      (err, results) => {
        if (err) console.log("setDPC ~ DPC.js SQL error :", err);
        else callback(results);
      }
    );
  } else {
    db.execute(
      "INSERT INTO DPC(ID_DEMANDEUR,TYPE_DEMANDE,DATE_DEM) VALUES(?,?,?)",
      [userID,typePrestation, date()],
      (err, results) => {
        if (err) console.log("setDPC ~ DPC.js SQL error :", err);
        else callback(results);
      }
    );
  }
}

function getBENE(benenom, beneprenom, dateNais, userID, callback) {
  db.execute(
    "SELECT * FROM BÉNÉFICIAIRE WHERE ID_DEMANDEUR = ? AND NOM = ? AND PRENOM = ? AND DATE_NAIS = ?",
    [userID, benenom, beneprenom, dateNais],
    (err, results) => {
      if (err) throw err;
      callback(results);
    }
  );
}

module.exports = {
  get: (req, res) => {
    if (req.session.isAuth && req.session.user) {
      getDemandeTable(req.session.user[0].ID, (results) => {
        table = results;
        res.render("ED", { table: table });
      });
    } else res.render("ED");
  },
  post: (req, res) => {
    const {
      typePrestation,
      statuAdh,
      nom,
      prenom,
      matricule,
      tele,
      email,
      Employeur,
      bene,
      benenom,
      beneprenom,
      lienparentie,
      date,
      Structure,
    } = req.body;
    var request = req.body;
    // validating the input
    if (!validator.isMobilePhone(tele, ["ar-DZ", "fr-FR"]))
      res.render("ED", {
        invalidTel: "votre numero de telephone est incorrect",
        request,
      });
    if (!validator.isEmail(email, ["ar-DZ", "fr-FR"]))
      res.render("ED", {
        invalidTel: "votre Email est incorrect",
        request,
      });
    // setting demandeur
    setDEMA(req.session.username, nom, prenom, matricule, tele, email);
    // setting the beneficiaire
    setBENE(
      bene,
      benenom,
      beneprenom,
      date,
      lienparentie,
      req.session.user[0].ID,
      (results) => {}
    );
    // setting the DPC
    setDPC(
      req.session.user[0].ID,
      benenom,
      beneprenom,
      date,
      typePrestation,
      () => {
        console.log("setting DPC done ty :-)");
      }
    );
    getDemandeTable(req.session.user[0].ID, (results) => {
      res.render("ED", { table: results });
    });
  },
};

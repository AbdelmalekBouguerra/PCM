const db = require("../env/db");
const validator = require("validator");
const date = require("./date");
const moment = require("moment");
var table = [];
function getDemandeTable(userId, callback) {
  db.execute(
    "SELECT * FROM DPC WHERE ID_DEMANDEUR = ?;",
    [userId],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i < results.length; i++) {
          // if beneficiaire pas null
          if (results[i].ID_BENEFICIAIRE == null) {
            delete results[i].ID_BENEFICIAIRE;
          }
          // formate date to DD-MM-YYYY
          results[i].DATE_DEM = moment(results[i].DATE_DEM).format(
            "DD-MM-YYYY"
          );
        }

        callback(results);
        console.log(
          "🚀 ~ file: DPC.js ~ line 22 ~ getDemandeTable ~ results",
          results
        );
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

function setDEMA(
  username,
  nom,
  prenom,
  statuAdh,
  matricule,
  employeur,
  tele,
  email
) {
  db.query(
    "INSERT INTO DEMANDEUR(USERNAME,NOM,PRENOM,STATU_DEMA,MATRICULE,EMPLOYEUR,TEL,MAIL) VALUES(?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE USERNAME = ?,NOM = ?,PRENOM = ?,STATU_DEMA = ?,MATRICULE = ?,EMPLOYEUR = ?,TEL = ?,MAIL = ?",
    [
      username,
      nom,
      prenom,
      statuAdh,
      matricule,
      employeur,
      tele,
      email,
      username,
      nom,
      prenom,
      statuAdh,
      matricule,
      employeur,
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
  structure,
  act,

  callback
) {
  //check if benenom is not undefined
  if (typeof benenom !== "undefined") {
    db.execute(
      "INSERT INTO DPC(ID_DEMANDEUR,ID_BENEFICIAIRE,TYPE_DEMANDE,DATE_DEM,STRUCTURE,ACT) VALUES(?,(SELECT ID FROM BÉNÉFICIAIRE WHERE ID_DEMANDEUR = ? AND NOM = ? AND PRENOM = ? AND DATE_NAIS = ?),?,?,?,?)",
      [userID, userID, benenom, beneprenom, dateNais, typePrestation, date(),structure,act],
      (err, results) => {
        if (err) console.log("setDPC ~ DPC.js SQL error :", err);
        else callback(results);
      }
    );
  } else {
    db.execute(
      "INSERT INTO DPC(ID_DEMANDEUR,TYPE_DEMANDE,DATE_DEM,STRUCTURE,ACT) VALUES(?,?,?,?,?)",
      [userID, typePrestation, date(),structure,act],
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
        console.log(
          "🚀 ~ file: DPC.js ~ line 126 ~ getDemandeTable ~ results",
          results
        );
        if (table.ID) {
        }
        res.render("ED", { table: table });
      });
    } else res.render("ED");
  },
  post: (req, res) => {
    try {
      // console.log("🚀 ~ file: DPC.js ~ line 155 ~ req.body", req.body)
      // throw new Error('BROKEN');
      let userID = req.session.user[0].ID;
      console.log("🚀 ~ file: DPC.js ~ line 132 ~ userID", userID);

      const {
        typePrestation,
        statuAdh,
        nom,
        prenom,
        matricule,
        tele,
        email,
        employeur,
        bene,
        benenom,
        beneprenom,
        lienparentie,
        date,
        structure,
        act,
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
      setDEMA(
        req.session.username,
        nom,
        prenom,
        statuAdh,
        matricule,
        employeur,
        tele,
        email
      );
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
        structure,
        act,

        () => {
          console.log("setting DPC done ty :-)");
        }
      );
      getDemandeTable(req.session.user[0].ID, (results) => {
        res.render("ED", { table: results, success: "done" });
      });
    } catch (error) {
      console.log(error);
      getDemandeTable(req.session.user[0].ID, (results) => {
        res.render("ED", { table: results, error: "done" });
      });
    }
  },
};

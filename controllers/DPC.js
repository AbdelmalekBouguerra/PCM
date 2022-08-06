const db = require("../config/sequelize");
const validator = require("validator");
const date = require("./date");
const moment = require("moment");
const { DataTypes } = require("sequelize");
const { error } = require("winston");

const dpc = require("../models/dpc")(db, DataTypes);
/*

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
      [
        userID,
        userID,
        benenom,
        beneprenom,
        dateNais,
        typePrestation,
        date(),
        structure,
        act,
      ],
      (err, results) => {
        if (err) console.log("setDPC ~ DPC.js SQL error :", err);
        else callback(results);
      }
    );
  } else {
    db.execute(
      "INSERT INTO DPC(ID_DEMANDEUR,TYPE_DEMANDE,DATE_DEM,STRUCTURE,ACT) VALUES(?,?,?,?,?)",
      [userID, typePrestation, date(), structure, act],
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

*/
module.exports = {
  get: async (req, res, next) => {
    /* Obtenir le user_id de la session. */
    try {
      const user_id = req.session.user_PCM.user_id;
      /* Vérifier si l'user_id est un nombre ou undefined. S'il ne s'agit pas d'un nombre ou si ce n'est
    pas défini, il affichera la page d'index. */
      if (typeof user_id !== "number" || user_id === undefined)
        res.status(401).render("index");

      const dpcTable = await dpc.findAll({ where: { user_id } });

      /* Vérifier si le dpcTable est vide ou non. S'il est vide, il affichera la page ED sans le tableau.
        S'il n'est pas vide, il affichera la page ED avec le tableau. */
      if (dpcTable.length === 0) {
        res.status(200).render("ED");
      } else {
        res.status(200).render("ED", { table: dpcTable });
      }
    } catch (error) {
      // todo replace console.log with winston logger
      console.log(error);
      next(error);
    }
  },
  post: (req, res) => {
    try {
      // let userID = req.session.user[0].ID;
      const user_id = req.session.user_PCM.user_id;

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

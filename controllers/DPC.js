const db = require("../env/db");
const style = require("../env/chalk");
const validator = require("validator");
const date = require('./date');


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


function setDPC(DPCinfo,callback) {
    db.execute(
        "INSERT INTO DPC(ID_DEMANDEUR,ID_BENEFICIAIRE,TYPE_DEMANDE,DATE_DEM) VALUES =(?,?,?,?);",
        [DPCinfo.ID_DEMANDEUR,DPCinfo.ID_BENEFICIAIRE,DPCinfo.TYPE_DEMANDE,date()],
        (err,results) => {
            if (err) console.log("setDPC ~ DPC.js SQL error :",err);
            else callback(results);
        }
    );
}




module.exports = {
  get: (req, res) => {
    // if (req.session.isAuth && req.session.user) {
    //     getDemandeTable(req.session.user[0].ID,(results)=>{
    //         table = results;
    //         res.render('ED',{table : table});
    //     })
    // } else
    res.render("ED");
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
    let request = req.body;
    console.log("🚀 ~ file: DPC.js ~ line 47 ~ req.body", req.body);
    // validating the input
    if (!validator.isMobilePhone(tele, ["ar-DZ", "fr-FR"]))
      res.render("ED", {
        invalidTel: "votre numero de telephone est incorrect",
        request
      });
      if (!validator.isEmail(email, ["ar-DZ", "fr-FR"]))
      res.render("ED", {
        invalidTel: "votre Email est incorrect",
        request
      });
      
  }
};

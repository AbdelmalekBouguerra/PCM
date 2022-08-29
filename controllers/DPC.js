const db = require("../config/sequelize");
// const validator = require("validator");
// const date = require("./date");
// const moment = require("moment");
const { DataTypes } = require("sequelize");
const updateOrCreate = require("../common/updateOrCreate");
const dpc = require("../models/dpc")(db, DataTypes);
const User = require("../models/user")(db, DataTypes);
const Beneficiaire = require("../models/beneficiare")(db, DataTypes);
const fs = require("fs");
const path = require("path");

// const cms_act = require("../models/cms_act")(db, DataTypes);
// const medecins_conventionnes = require("../models/medecins_conventionnes")(
//   db,
//   DataTypes
// );
// const medecin_travail_act = require("../models/medecin_travail_act")(
//   db,
//   DataTypes
// );
// const tiers_payant_structure = require("../models/tier_payant_structure")(
//   db,
//   DataTypes
// );

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
      // const user = await User.findOne({ where: { user_id: user_id } });
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
  post: async (req, res) => {
    try {
      // let userID = req.session.user[0].ID;
      const user_id = req.session.user_PCM.user_id;
      const userSon = req.session.user_PCM.username;
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
        medecin,
        cmsSpecialite,
        cms,
        numberOfInputs,
        act,
      } = req.body;

      updateOrCreate(
        User,
        {
          nom,
          prenom,
          son: userSon,
          status: statuAdh,
          matricule,
          email,
          employeur,
          tele,
        },
        { matricule: matricule }
      );
      // const user = await User.findOrCreate({
      //   where: { matricule },
      //   defaults: {
      //     nom,
      //     prenom,
      //     son: "new",
      //     matricule,
      //     role: "user",
      //     email,
      //     tele,
      //   },
      // });

      if (bene === "Ayant droit") {
        await Beneficiaire.findOrCreate({
          where: { user_id, prenom: beneprenom, lien_parante: lienparentie },
          defaults: {
            user_id,
            nom: benenom,
            prenom: beneprenom,
            lien_parante: lienparentie,
            date_naissance: date,
          },
        });
      }
      /* Compter le nombre de DPC pour l'utilisateur. */
      const userDpcCount = await dpc.count({ where: { user_id } });

      /* Création d'un numero unique qui containe user_id et numero de demande "00001-00001"*/
      const userDpcNumber =
        String(user_id).padStart(5, "0") +
        "-" +
        String(parseInt(userDpcCount) + 1).padStart(5, "0");

      // file upload handler
      const uploadDir = path.join(__dirname, "../uploads", userDpcNumber);
      if (numberOfInputs == 0) {
        fs.mkdir(uploadDir, (err) => {
          if (err) return res.status(500).send(err);
          console.log("Directory is created.");
        });
        file = req.files.file;
        let uploadPath = path.join(uploadDir, file.name);
        file.mv(uploadPath + file.name, (err) => {
          if (err) return res.status(500).send(err);
          console.log("File uploaded!");
        });
      } else {
        fs.mkdir(uploadDir, (err) => {
          if (err) return res.status(500).send(err);
          console.log("Directory is created.");
        });
        file = req.files.file;
        let uploadPath = path.join(uploadDir, file.name);
        file.mv(uploadPath + file.name, (err) => {
          if (err) return res.status(500).send(err);
          console.log("File uploaded!");
        });
        for (let i = 1; i <= numberOfInputs; i++) {
          eval(`file${i} = req.files.file${i}`);
          eval(`let uploadPath = path.join(uploadDir, file${i}.name);
                file${i}.mv(uploadPath + file${i}.name, (err) => {
                if (err) return res.status(500).send(err);
                console.log("File uploaded!");
              });`);
        }
        console.log("thers is more then 1 file");
      }
      // find the id of the act
      let actId;
      if (
        typePrestation === "Tiers payant" ||
        typePrestation === "Prises en charge 100 %"
      )
        actId = structure;
      else if (typePrestation === "Médecines de soins") actId = medecin;
      else if (typePrestation === "Randevou CMS")
        actId = String(cmsSpecialite).padEnd(4, "0") + cms;

      await dpc.create({
        dpc_number: userDpcNumber,
        user_id,
        id_act: actId,
        type_demande: typePrestation,
        date_creation: new Date().toISOString().slice(0, 10), // format yyyy-mm-dd,
      });
      /* Obtenir tous les enregistrements dpc pour le user_id. */
      const dpcTable = await dpc.findAll({ where: { user_id } });

      res.status(200).render("ED", { table: dpcTable, success: "done" });
    } catch (error) {
      // const dpcTable = await dpc.findAll({ where: { user_id } });
      console.clear();
      console.log(
        "============================= error ============================= "
      );
      console.log(error);
      res.status(500).render("ED", { table: dpcTable, error: error });
    }
  },
};

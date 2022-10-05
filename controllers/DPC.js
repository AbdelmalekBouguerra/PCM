const db = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const updateOrCreate = require("../common/updateOrCreate");
const dpc = require("../models/dpc")(db, DataTypes);
const User = require("../models/user")(db, DataTypes);
const Beneficiaire = require("../models/beneficiare")(db, DataTypes);
const fs = require("fs");
const path = require("path");

module.exports = {
  get: async (req, res, next) => {
    const PCM_USERNAME = req.session.PCM_USERNAME;
    const user = await User.findOne({ where: { son: PCM_USERNAME } });

    if (!user) {
      res.status(200).render("ED");
      return;
    }

    try {
      const dpcTable = await dpc.findAll({ where: { user_id: user.user_id } });
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
    const PCM_USERNAME = req.session.PCM_USERNAME;

    try {
      // let userID = req.session.user[0].ID;
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

      const user = updateOrCreate(
        User,
        {
          nom,
          prenom,
          son: PCM_USERNAME,
          status: statuAdh,
          matricule,
          email,
          employeur,
          tele,
        },
        { son: PCM_USERNAME }
      )
        .then(async (user) => {
          const user_id = user.user_id;
          let beneficiaire;
          if (bene === "Ayant droit") {
            beneficiaire = await Beneficiaire.findOrCreate({
              where: {
                user_id,
                prenom: beneprenom,
                lien_parante: lienparentie,
              },
              defaults: {
                user_id,
                nom: benenom,
                prenom: beneprenom,
                lien_parante: lienparentie,
                date_naissance: date,
              },
            });
            if (beneficiaire == null || typeof beneficiaire == undefined) {
              console.log("Error beneficiaire is null or undefined");
              res.status(500).render("ED", { table: dpcTable, error: "done" });
              return;
            }
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
            beneficiare_id: beneficiaire?.id || 0,
            user_id,
            id_act: actId,
            type_demande: typePrestation,
            date_creation: new Date().toISOString().slice(0, 10), // format yyyy-mm-dd,
          });
          /* Obtenir tous les enregistrements dpc pour le user_id. */
          const dpcTable = await dpc.findAll({ where: { user_id } });

          /* Rendu de la vue avec les données. */
          res.status(200).render("ED", { table: dpcTable, success: "done" });
        })
        .catch(async (err, dpcTable) => {
          console.log(typeof err);
          console.log("================================================");
          console.log(err);
          console.log("================================================");
          console.log(err?.errors[0]);
          //todo add here if whene msg not defined
          res.status(500).render("ED", {
            table: dpcTable,
            error: "done",
            msg: `Veuillez bien vérifier votre ${err.errors[0].path}`,
          });
          return;
        });
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

const { DataTypes } = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../../config/sequelize");

const structure = require("../../models/structure")(db, DataTypes);
const medecinTravailModel = require("../../models/medecin_travail_act")(
  db,
  DataTypes
);
module.exports = {
  sh: async (req, res, next) => {
    try {
      const structures = await structure.findAll();
      res.status(200).json(structures);
    } catch (error) {
      next(error);
    }
  },
  tiersPayant: (req, res, next) => {
    try {
      console.log("tiersPayant", req.params.designation);
      const tps = db
        .query(
          `SELECT libelle FROM act,tiers_payant_structure AS tp 
          WHERE SUBSTRING(act.code,6,4) = tp.code AND designation = ?;`,
          {
            replacements: [req.params.designation],
            type: QueryTypes.SELECT,
          }
        )
        .then((result) => {
          result = result.map((resultItem) => resultItem.libelle);
          result.length > 0 ? res.status(200).json(result) : res.status(404);
        })
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  medecinTravail: (req, res, next) => {
    try {
      medecinTravailModel
        .findAll({ group: "acte", attributes: ["acte"] })
        .then((results) => {
          results = results.map((result) => result.acte);
          results.length > 0 ? res.status(200).json(results) : res.status(404);
        })
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  medecinTravailStr: (req, res, next) => {
    try {
      medecinTravailModel
        .findAll({
          attributes: ["structure"],
          where: { acte: req.params.designation },
        })
        .then((results) => {
          console.log(results);
          results = results.map((result) => result.structure);
          results.length > 0 ? res.status(200).json(results) : res.status(404);
        })
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

const { DataTypes } = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../../config/sequelize");

const medecins_conventionnes = require("../../models/medecins_conventionnes")(
  db,
  DataTypes
);
module.exports = {
  specialite: async (req, res, next) => {
    try {
      const specialites = await medecins_conventionnes.findAll({
        group: "specialite",
        attributes: ["specialite"],
      });
      const result = specialites.map((item) => item.specialite);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  wilaya: async (req, res, next) => {
    try {
      const wilayas = await medecins_conventionnes.findAll({
        attributes: ["wilaya"],
        group: "wilaya",
        where: { specialite: req.params.specialite },
      });
      const result = wilayas.map((item) => item.wilaya);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  medecin: async (req, res, next) => {
    try {
      const medecins = await medecins_conventionnes.findAll({
        where: { specialite: req.params.specialite, wilaya: req.params.wilaya },
        attributes: ["medecin"],
      });
      const result = medecins.map((item) => item.medecin);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

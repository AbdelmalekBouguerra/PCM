const { DataTypes } = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../../config/sequelize");

const cms_act = require("../../models/cms_act")(db, DataTypes);
module.exports = {
  specialite: async (req, res, next) => {
    try {
      const specialites = await cms_act.findAll({
        group: "specialite",
        attributes: ["id", "specialite"],
      });
      res.status(200).json(specialites);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  structure: async (req, res, next) => {
    try {
      const cmss = await cms_act.findAll({
        attributes: ["id", "cms_boumerdes", "cms_tiziouzou"],
        where: { id: req.params.specialite },
      });
      const result = [];
      cmss.forEach((cms) => {
        if (cms.cms_boumerdes == 1)
          result.push({ libelle: "CMS boumerdes", id: 1 });
        if (cms.cms_tiziouzou == 1)
          result.push({ libelle: "CMS Tizi Ouzou", id: 2 });
      });
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

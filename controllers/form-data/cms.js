const { DataTypes } = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../../config/sequelize");

const cms_act = require("../../models/cms_act")(db, DataTypes);
module.exports = {
  specialite: async (req, res, next) => {
    try {
      const specialites = await cms_act.findAll({
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
  structure: async (req, res, next) => {
    try {
      const cmss = await cms_act.findAll({
        attributes: ["cms_boumerdes", "cms_tiziouzou"],
        group: "specialite",
        where: { specialite: req.params.specialite },
      });
      const result = [];
      cmss.forEach((cms) => {
        if (cms.cms_boumerdes == 1) result.push("CMS boumerdes");
        if (cms.cms_tiziouzou == 1) result.push("CMS Tizi Ouzou");
      });
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

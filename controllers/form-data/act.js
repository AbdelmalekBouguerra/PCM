const { DataTypes } = require("sequelize");
const db = require("../../config/sequelize");

const act = require("../../models/act")(db, DataTypes);
const tp_structure = require("../../models/tiers_payant_structure")(
  db,
  DataTypes
);
module.exports = {
  actType: async (req, res, next) => {
    try {
      // const acts = await db.query(
      //   "select designation from act group by designation"
      // );
      const acts = await act.findAll({
        group: "designation",
        attributes: ["designation"],
      });
      const actsTypes = acts.map((act) => act.designation);
      res.status(200).json(actsTypes);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  actCode: async (req, res, next) => {
    try {
      const tp = await tp_structure.findOne({
        where: { code: req.params.actCode.substring(5, 9) },
        attributes: ["libelle"],
      });
      const acts = await act.findOne({
        where: { code: req.params.actCode },
        attributes: ["id", "designation"],
      });
      if (acts === null) res.sendStatus(404);
      else {
        const code = {
          libelle: `${tp.dataValues.libelle} - ${acts.dataValues.designation}`,
          id: acts.dataValues.id,
        };
        res.status(200).json(code);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

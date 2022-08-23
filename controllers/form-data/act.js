const { DataTypes } = require("sequelize");
const db = require("../../config/sequelize");

const act = require("../../models/act")(db, DataTypes);
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
      const acts = await act.findOne({
        where: { code: req.params.actCode },
        attributes: ["designation"],
      });
      if (acts === null) res.sendStatus(404);
      else {
        const code = acts.dataValues.designation;
        res.status(200).json(code);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

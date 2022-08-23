var DataTypes = require("sequelize").DataTypes;
var _act = require("./act");
var _beneficiare = require("./beneficiare");
var _dpc = require("./dpc");
var _medecin_travail_act = require("./medecin_travail_act");
var _structure = require("./structure");
var _tiers_payant_structure = require("./tiers_payant_structure");
var _user = require("./user");

function initModels(sequelize) {
  var act = _act(sequelize, DataTypes);
  var beneficiare = _beneficiare(sequelize, DataTypes);
  var dpc = _dpc(sequelize, DataTypes);
  var medecin_travail_act = _medecin_travail_act(sequelize, DataTypes);
  var structure = _structure(sequelize, DataTypes);
  var tiers_payant_structure = _tiers_payant_structure(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  beneficiare.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(beneficiare, { as: "beneficiares", foreignKey: "user_id"});
  dpc.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(dpc, { as: "dpcs", foreignKey: "user_id"});

  return {
    act,
    beneficiare,
    dpc,
    medecin_travail_act,
    structure,
    tiers_payant_structure,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

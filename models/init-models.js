var DataTypes = require("sequelize").DataTypes;
var _demandeur = require("./demandeur");
var _dpc = require("./dpc");
var _employeur = require("./employeur");
var _user = require("./user");

function initModels(sequelize) {
  var demandeur = _demandeur(sequelize, DataTypes);
  var dpc = _dpc(sequelize, DataTypes);
  var employeur = _employeur(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    demandeur,
    dpc,
    employeur,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

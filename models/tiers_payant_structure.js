const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tiers_payant_structure', {
    tiers_payant_structure_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: "code_UNIQUE"
    },
    libelle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    adresse: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tele: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    actif: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'tiers_payant_structure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tiers_payant_structure_id" },
        ]
      },
      {
        name: "code_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
    ]
  });
};

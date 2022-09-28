const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_flux_confirmation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    niveau: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ordre_affichage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "ordre_affichage_UNIQUE"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_creation: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    date_maj: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sys_flux_confirmation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "ordre_affichage_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ordre_affichage" },
        ]
      },
    ]
  });
};

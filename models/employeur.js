const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeur', {
    employeur_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(4),
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
    region: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    telephone: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employeur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "employeur_id" },
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

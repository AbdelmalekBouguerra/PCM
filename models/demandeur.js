const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('demandeur', {
    demendeur_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    matricule: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: "matricule_UNIQUE"
    },
    statut_adherent: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING(320),
      allowNull: true
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    actif: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'demandeur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "demendeur_id" },
        ]
      },
      {
        name: "matricule_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "matricule" },
        ]
      },
    ]
  });
};

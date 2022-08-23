const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
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
    son: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "user"
    },
    matricule: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: "matricule_UNIQUE"
    },
    employeur: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tele: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "Statut de l’adhérent :\nAgent\nRetraité(e)\nveuf(ve)\n"
    },
    actif: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
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

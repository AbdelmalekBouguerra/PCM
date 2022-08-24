const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medecins_conventionnes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    medecin: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    specialite: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    adresse: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tele: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    wilaya: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'medecins_conventionnes',
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
    ]
  });
};

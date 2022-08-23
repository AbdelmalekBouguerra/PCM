module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "medecin_travail_act",
    {
      medecin_travail_structure_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      acte: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      structure: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      adresse: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tele: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "medecin_travail_act",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "medecin_travail_structure_id" }],
        },
      ],
    }
  );
};

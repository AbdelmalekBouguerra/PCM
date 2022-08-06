module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "dpc",
    {
      dpc_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_act: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dpc_confirmation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type_demande: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      date_creation: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      date_maj: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: "date de mise à jour",
      },
    },
    {
      sequelize,
      tableName: "dpc",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "dpc_id" }],
        },
      ],
    }
  );
};

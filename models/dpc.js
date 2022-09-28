const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dpc', {
    dpc_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dpc_number: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    beneficiare_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_act: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    structure_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type_demande: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    agent_1_confirmation: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    agent_2_confirmation: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    agent_3_confirmation: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    agent_4_confirmation: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    date_creation: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_maj: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "date de mise à jour"
    },
    date_creation_document: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dpc',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dpc_id" },
        ]
      },
      {
        name: "user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};

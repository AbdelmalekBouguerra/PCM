const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('structure', {
    structure_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    'code_mnémonique': {
      type: DataTypes.STRING(3),
      allowNull: true,
      unique: "code_mnémonique_UNIQUE"
    },
    structure_libelle: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'structure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "structure_id" },
        ]
      },
      {
        name: "code_mnémonique_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code_mnémonique" },
        ]
      },
    ]
  });
};

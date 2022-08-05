module.exports = function (db, Sequelize) {
  const user = db.define(
    "user",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      son: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      matricule: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: Sequelize.STRING,
      actif: Sequelize.TINYINT,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return user;
};

module.exports = function (sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    losses: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  });
  return Game;

};

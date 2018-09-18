module.exports = function (sequelize, DataTypes) {

  var game = sequelize.define("game", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 20]
    },
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER
  });
  return game;
};

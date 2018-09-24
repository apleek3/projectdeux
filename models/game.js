module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Game.associate = function(models) {
    // We're saying that a Game should belong to an User
    // A Game can't be created without an User due to the foreign key constraint
    Game.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Game;
};

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    name: DataTypes.STRING
    ,
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      isUnique: true,
      allowNull: false
    }
    // ,
    // pswd: {

    // }
  });

  User.associate = function (models) {
    // Associating User with Posts
    // When an User is deleted, also delete any associated Posts
    User.hasMany(models.Game, {
      onDelete: "cascade"
    });
  };

  return User;
};

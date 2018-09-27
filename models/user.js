    // Giving the User model some structure. Validates the email and is unique.
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      isUnique: true,
      allowNull: false
    }
    // ,
    // pswd: { //PASSWORD structure for later (ICEBOX)

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

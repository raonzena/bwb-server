module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
      userId: DataTypes.STRING,
      userPw: DataTypes.STRING,
      nickname: DataTypes.STRING,
      gender: DataTypes.INTEGER
    }, {});
    users.associate = function(models) {
    };
    return users;
};
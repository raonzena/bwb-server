module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
      userId: DataTypes.STRING,
      userPw: DataTypes.STRING,
      nickname: DataTypes.STRING,
      gender: DataTypes.INTEGER
    }, 
    {
        hooks: {
            beforeCreate: (data, options) => {
            var shasum = crypto.createHash('sha1');
            shasum.update(data.dataValues.password);
            data.dataValues.password = shasum.digest('hex');
            }
        }
    });
    
    users.associate = function(models) {
    };

    return users;
};
const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    userPw: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    gender: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (data, options) => {
      var shasum = crypto.createHash('sha1');
      shasum.update(data.dataValues.userPw);
      data.dataValues.userPw = shasum.digest('hex');
      }
    }
  }, {
    tableName: 'users'
  });
};

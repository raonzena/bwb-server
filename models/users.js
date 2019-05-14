/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
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
    tableName: 'users'
  }, {
    hooks: {
      beforeCreate: (data, options) => {
      var shasum = crypto.createHash('sha1');
      shasum.update(data.dataValues.password);
      data.dataValues.password = shasum.digest('hex');
      }
    }
  });
};

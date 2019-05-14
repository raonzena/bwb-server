/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('meetings', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    restaurant_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'restaurants',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    limit: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'meetings'
  });
};

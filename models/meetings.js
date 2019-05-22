/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var meetings = sequelize.define('meetings', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
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
  meetings.associate = function(models) {
    meetings.belongsTo(models.restaurants, {
      foreignKey: "restaurant_id"
    });
    meetings.belongsTo(models.users, {
      foreignKey: "owner_id"
    });
  };
  return meetings;
};

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var members = sequelize.define('members', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    meeting_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'meetings',
        key: 'id'
      }
    },
    members_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
      tableName: 'members'
    });
  members.associate = function (models) {
    members.belongsTo(models.meetings, {
      foreignKey: "meeting_id"
    });
    members.belongsTo(models.users, {
      foreignKey: "members_id"
    });
  };
  return members;
};

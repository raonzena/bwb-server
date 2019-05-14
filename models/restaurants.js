/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('restaurants', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    placeId: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'restaurants'
  });
};

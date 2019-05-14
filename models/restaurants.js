module.exports = (sequelize, DataTypes) => {
    const restaurants = sequelize.define('restaurants', {
      placeId: DataTypes.STRING
    }, {});
    restaurants.associate = function(models) {
    };
    return restaurants;
};
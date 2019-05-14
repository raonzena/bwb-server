module.exports = (sequelize, DataTypes) => {
    const meetings =  sequelize.define('meetings', {
      restaurant_id: DataTypes.STRING,
      name: DataTypes.STRING,
      owner_id: DataTypes.INTEGER,
      time: DataTypes.DATE,
      limit: DataTypes.INTEGER
    }, {});
    meetings.associate = function(models) {
    };
    return meetings;
};
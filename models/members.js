module.exports = (sequelize, DataTypes) => {
    const members =  sequelize.define('members', {
      meeting_id: DataTypes.INTEGER,
      members_id: DataTypes.INTEGER
    }, {});
    members.associate = function(models) {
    };
    return members;
};
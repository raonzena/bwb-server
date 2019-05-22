module.exports = function (sequelize, DataTypes) {
    return sequelize.define('tokenBlacklist', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        tokens: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        expiresIn: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
            tableName: 'tokenBlacklist'
        });
};
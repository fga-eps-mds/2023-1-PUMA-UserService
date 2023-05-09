const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Physical_Agent = database.define('Physical_Agent', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: {
                tableName: "Common_User",
                schema: "public",
            },
            key: "userId"
        },
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true
})

module.exports = Physical_Agent
const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Juridical_Agent = database.define('Juridical_Agent_TESTE', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: {
                tableName: "Common_User",
                schema: "public",
            },
            key: "email"
        },
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    socialReason: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = Juridical_Agent
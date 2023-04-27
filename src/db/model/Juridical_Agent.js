const Sequelize = require('sequelize');
const database = require('./AppDb');

const Juridical_Agent = database.init('Juridical_Agent', {
    email: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    socialReason: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Juridical_Agent
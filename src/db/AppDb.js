const { Sequelize } = require('sequelize');

const appDbConfig = require('../config/appDbConfig');

const sequelize = new Sequelize(appDbConfig.database, appDbConfig.username, appDbConfig.password, {
    host: appDbConfig.host,
    dialect: appDbConfig.dialect,
    query:{raw:true}
});

module.exports = sequelize;
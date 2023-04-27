import { Sequelize } from 'sequelize';

import { appDbConfig } from '../config/appDbConfig';

const sequelize = new Sequelize(appDbConfig.database, appDbConfig.username, appDbConfig.password, {
    host: appDbConfig.host,
    dialect: appDbConfig.dialect,
});

module.exports = sequelize;
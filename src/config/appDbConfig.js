require('dotenv/config');
const environment = require('../config/environment.config');
environment.configEnv();
const connectionHost = global.DB_APP_HOST;

const appDbConfig = {
    dialect: 'postgres',
    host: connectionHost,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};

module.exports = appDbConfig;
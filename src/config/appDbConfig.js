require('dotenv/config');

export const appDbConfig = {
    dialect: 'postgres',
    host: process.env.DB_APP_HOST,
    username: process.env.DB_APP_USER,
    password: process.env.DB_APP_PASS,
    database: process.env.DB_APP_NAME,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
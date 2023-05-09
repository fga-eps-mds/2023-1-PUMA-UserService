require('dotenv').config();

module.exports = {
  configEnv: () => {
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_API = `http://${process.env.IP_ADDRESS}:5000`;
      global.SECRET = process.env.SECRET;
      global.DB_URL = process.env.DB_URL;
      global.DB_APP_HOST = process.env.DB_APP_HOST;
    } else if (process.env.ENVIRONMENT === 'test') {
      global.URL_API = `http://${process.env.IP_ADDRESS}:3004`;
      global.SECRET = process.env.SECRET;
      global.DB_URL = process.env.DB_URL_TEST;
      global.DB_APP_HOST = process.env.DB_APP_HOST_TEST;
    } else if (process.env.ENVIRONMENT === 'hom') {
      global.URL_API = 'https://puma2023-1-user.herokuapp.com';
      global.SECRET = process.env.SECRET;
      global.DB_URL = process.env.DB_URL;
      global.DB_APP_HOST = process.env.DB_APP_HOST;
    } else if (process.env.ENVIRONMENT === 'prod') {
      global.URL_API = `http://${process.env.IP_ADDRESS}:3004`;
      global.SECRET = process.env.SECRET_PROD;
      global.DB_URL = process.env.DB_URL;
      global.DB_APP_HOST = process.env.DB_APP_HOST;
    } else if (process.env.ENVIRONMENT === 'service-dev') {
      global.URL_API = `http://${process.env.IP_ADDRESS}:3004`;
      global.SECRET = process.env.SECRET;
      global.DB_URL = process.env.DB_URL_DEV;
      global.DB_APP_HOST = process.env.DB_APP_HOST_DEV;
    }
  },
};

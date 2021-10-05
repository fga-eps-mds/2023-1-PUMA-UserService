// eslint-disable-next-line import/no-unresolved
require('dotenv').config();

module.exports = {
  configEnv: () => {
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_API = `http://${process.env.IP_ADDRESS}:3004`;
      global.SECRET = process.env.SECRET;
    }
  },
};

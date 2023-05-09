const userRoutes = require('./userRouter');
const userTypeRoutes = require('./userTypeRouter');

module.exports = (app) => {
  app.use('/', [userRoutes, userTypeRoutes]);
};

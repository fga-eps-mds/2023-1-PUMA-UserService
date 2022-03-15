const userRoutes = require('./userRouter');

module.exports = (app) => {
  app.use('/', [userRoutes]);
};

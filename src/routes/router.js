const userRoutes = require('./userRouter');
const userTypeRoutes = require('./userTypeRouter');
const contactRoutes = require('./contactRouter');

module.exports = (app) => {
  app.use('/', [userRoutes, userTypeRoutes, contactRoutes]);
};

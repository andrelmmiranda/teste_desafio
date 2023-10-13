const { publicRoutes } = require('./public');
const { userRoutes, categoryRoutes, transactionRoutes } = require('./private');

module.exports = (app)=>{   
    app.use(publicRoutes, userRoutes, categoryRoutes, transactionRoutes);
}
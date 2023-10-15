const { Router } = require('express');
const { tokenValidator, FieldValidator } = require('../../middlewares');
const { UserController } = require('../../controllers');

const userRoutes = Router();

userRoutes.use(tokenValidator)
userRoutes.get('/usuario', UserController.getUser);
userRoutes.put('/usuario', FieldValidator.userValidator, UserController.updateUser);

module.exports = { userRoutes };
const { Router } = require('express');
const { tokenValidator, FieldValidator } = require('../../middlewares');
const { UserController } = require('../../controllers');

const userRoutes = Router();

userRoutes.get('/usuario', tokenValidator, UserController.getUser);

userRoutes.put('/usuario', FieldValidator.userValidator, tokenValidator, UserController.updateUser);

module.exports = { userRoutes };
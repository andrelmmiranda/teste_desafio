const { Router } = require('express');
const publicRoutes = Router();

const { FieldValidator, userAlreadyExistsValidator } = require('../../middlewares');
const { PublicController } = require('../../controllers');

publicRoutes.post('/usuario', FieldValidator.userValidator, userAlreadyExistsValidator, PublicController.createUser);

publicRoutes.post('/login', FieldValidator.loginValidator, userAlreadyExistsValidator, PublicController.login)

module.exports = { publicRoutes };
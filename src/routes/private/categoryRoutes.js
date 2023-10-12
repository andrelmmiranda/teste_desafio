const { Router } = require('express');
const { tokenValidator } = require('../../middlewares');
const { CategoryController } = require('../../controllers');

const categoryRoutes = Router();

categoryRoutes.get('/categoria', tokenValidator, CategoryController.getCategories);

module.exports = { categoryRoutes };
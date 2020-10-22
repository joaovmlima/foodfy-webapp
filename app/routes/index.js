const express = require('express')
const routes = express.Router()
const recipesController = require('../controllers/recipesController')

routes.get('/', recipesController.index)

routes.get('/about', recipesController.about)

routes.get('/recipes', recipesController.recipes)

routes.get('/recipeDetails', recipesController.recipeDetails)

routes.get('/recipes/:id', recipesController.recipeId)

routes.get('/chefs', recipesController.chefs)

routes.get('/chefs/:id', recipesController.chefsId)

module.exports = routes

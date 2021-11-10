const express = require('express')
const adminController = require('../controllers/adminController')
const passport = require('passport')
const routes = express.Router()


// Login
routes.get('/login', adminController.login)

routes.post('/login',
  passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/login',
                                   failureFlash: true })
)

// ------- RECIPES

routes.get('/admin', adminController.redirect)

routes.get('/admin/recipes', adminController.index)

routes.get('/admin/recipes/create', adminController.create)

routes.post('/admin/recipes', adminController.post)

routes.get('/admin/recipes/:id', adminController.show)

routes.get('/admin/recipes/:id/edit', adminController.edit)

routes.put('/admin/recipes/:id', adminController.put)

routes.delete('/admin/recipes/:id', adminController.delete)

// ------- CHEFS

routes.get('/admin/chefs/create', adminController.chefs_create)

routes.get('/admin/chefs', adminController.chefs_index)

routes.post('/admin/chefs', adminController.chefs_post)

routes.get('/admin/chefs/:id', adminController.chefs_show)

routes.get('/admin/chefs/:id/edit', adminController.chefs_edit)

routes.put('/admin/chefs/:id', adminController.chefs_put)

routes.delete('/admin/chefs/:id', adminController.chefs_delete)

module.exports = routes

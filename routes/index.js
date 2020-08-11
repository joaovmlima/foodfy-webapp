const express = require("express")
const routes = express.Router()
const recipes = require("./recipes")
const db = require('../src/db')

routes.get("/", function (req, res) {
    db.query(`SELECT recipes.id, recipes.created_at, recipes.image, recipes.title, C.name
        FROM recipes
        LEFT JOIN chefs C ON (recipes.chef_id = C.id)
        ORDER BY recipes.created_at DESC`, function (err, results) {
        console.log(err)
        if (err) return res.send('Database Error!')

        return res.render("index", { recipes: results.rows })
    })
})
routes.get("/about", function (req, res) {
    return res.render("about")
})
routes.get("/recipes", function (req, res) {
    db.query(`SELECT recipes.id, recipes.image, recipes.ingredients, recipes.preparation, recipes.information, recipes.title, C.name
        FROM recipes
        LEFT JOIN chefs C ON (recipes.chef_id = C.id)
        ORDER BY recipes.id`, function (err, results) {
        if (err) return res.send('Database Error!')

        return res.render("recipes", { recipes: results.rows })
    })
})
routes.get("/recipeDetails", function (req, res) {
    db.query(`SELECT * FROM recipes`, function (err, results) {
        if (err) return res.send('Database Error!')
        return res.render("recipeDetails", { recipes: results.rows })
    })
})

routes.get("/recipes/:id", function (req, res) {
    const { id } = req.params

    db.query(`SELECT * FROM recipes 
    LEFT JOIN chefs C 
    ON (recipes.chef_id = C.id) 
    WHERE recipes.id = ${id}`, function (err, results) {
        if (err) return res.send('Database Error!')
        let recipe = results.rows[0]
        if (!recipe) return res.send("Recipe not found!")

        return res.render("recipeDetails", { recipe: results.rows[0] })
    })
})

routes.get("/chefs", function (req, res) {
    db.query(`SELECT * FROM chefs`, function (err, results) {
        if (err) return res.send('Database Error!')

        return res.render("chefs", { chefs: results.rows })
    })
})

routes.get("/chefs/:id", function (req, res) {
    const { id } = req.params

    db.query(`SELECT *, chefs.id AS chef_id
            from chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = ${id}`,
        function (err, results) {
            if (err) return res.send("Database Error!")

            let chef = results.rows
            if (!chef) return res.send("Chef not found!")

            return res.render("chefDetails", { chef: results.rows[0], recipes: results.rows })
        })
})

//PARTE ADMINISTRATIVA
// ------- RECIPES
routes.get("/admin", recipes.redirect)

routes.get("/admin/recipes", recipes.index)

routes.get("/admin/recipes/create", recipes.create)

routes.post("/admin/recipes", recipes.post)

routes.get("/admin/recipes/:id", recipes.show)

routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.put("/admin/recipes/:id", recipes.put)

routes.delete("/admin/recipes/:id", recipes.delete)

// ------- CHEFS

routes.get("/admin/chefs/create", recipes.chefs_create)

routes.get("/admin/chefs", recipes.chefs_index)

routes.post("/admin/chefs", recipes.chefs_post)

routes.get("/admin/chefs/:id", recipes.chefs_show,)

routes.get("/admin/chefs/:id/edit", recipes.chefs_edit)

routes.delete("/admin/chefs/:id", recipes.chef_delete)

module.exports = routes
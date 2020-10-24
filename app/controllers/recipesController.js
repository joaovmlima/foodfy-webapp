const db = require('../config/db')

module.exports = {
  index(req, res) {
    let { filter } = req.query

    if (filter) {
      db.query(
        "SELECT recipes.id, recipes.created_at, recipes.image, recipes.title, C.name FROM recipes LEFT JOIN chefs C ON(recipes.chef_id = C.id) WHERE recipes.title ILIKE '%' || ($1) || '%'",
        [filter],
        function (err, results) {
          if (err) return res.send('Database Error!'), console.log(err)

          return res.render('search', { filter, recipes: results.rows })
        }
      )
    } else {
      db.query(
        `SELECT recipes.id, recipes.created_at, recipes.image, recipes.title, C.name
          FROM recipes
          LEFT JOIN chefs C ON (recipes.chef_id = C.id)
          ORDER BY recipes.created_at DESC`,
        function (err, results) {
          if (err) return res.send('Database Error!')

          return res.render('index', { recipes: results.rows })
        }
      )
    }
  },

  about(req, res) {
    return res.render('about')
  },

  recipes(req, res) {
    //filtering and pagination logic below
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 4
    let offset = 4 * (page - 1)

    let previousPage = Number(page) - 1
    let nextPage = Number(page) + 1
    let totalPages = []

    if (previousPage != 0) {
      totalPages = [previousPage, Number(page), nextPage]
    } else {
      totalPages = [nextPage, nextPage + 1]
    }

    if (filter) {
      db.query(
        `SELECT recipes.id, recipes.created_at, recipes.image, recipes.title, C.name FROM recipes LEFT JOIN chefs C ON(recipes.chef_id = C.id) WHERE recipes.title ILIKE '%' || ($1) || '%'`,
        [filter],
        function (err, results) {
          if (err) return res.send('Database Error!')

          return res.render('search', {
            currentPage: page,
            totalPages,
            filter,
            recipes: results.rows
          })
        }
      )
    } else {
      db.query(
        `SELECT recipes.id, recipes.image, recipes.ingredients, recipes.preparation, recipes.information, recipes.title, C.name
        FROM recipes
        LEFT JOIN chefs C ON (recipes.chef_id = C.id)
        ORDER BY recipes.id
        LIMIT $1
        OFFSET $2`,
        [limit, offset],
        function (err, results) {
          if (err) return res.send('Database Error!')

          return res.render('recipes', {
            currentPage: page,
            totalPages,
            limit,
            recipes: results.rows
          })
        }
      )
    }
  },

  recipeDetails(req, res) {
    db.query(`SELECT * FROM recipes`, function (err, results) {
      if (err) return res.send('Database Error!')
      return res.render('recipeDetails', { recipes: results.rows })
    })
  },

  recipeId(req, res) {
    const { id } = req.params

    db.query(
      `SELECT * FROM recipes 
    LEFT JOIN chefs C 
    ON (recipes.chef_id = C.id) 
    WHERE recipes.id = ($1)`,
      [id],
      function (err, results) {
        if (err) return res.send('Database Error!')
        let recipe = results.rows[0]
        if (!recipe) return res.send('Recipe not found!')

        return res.render('recipeDetails', { recipe: results.rows[0] })
      }
    )
  },

  chefs(req, res) {
    db.query(`SELECT * FROM chefs`, function (err, results) {
      if (err) return res.send('Database Error!')

      return res.render('chefs', { chefs: results.rows })
    })
  },

  chefsId(req, res) {
    const { id } = req.params

    db.query(
      `SELECT *, chefs.id AS chef_id
            from chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = ($1)`,
      [id],
      function (err, results) {
        if (err) return res.send('Database Error!')

        let chef = results.rows
        if (!chef) return res.send('Chef not found!')

        return res.render('chefDetails', { chef: results.rows[0], recipes: results.rows })
      }
    )
  }
}

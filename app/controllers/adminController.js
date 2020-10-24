const db = require('../config/db')

module.exports = {
  // ------- RECIPES
  index(req, res) {
    db.query(
      `SELECT recipes.id, recipes.image, recipes.ingredients, recipes.preparation,
        recipes.information, recipes.title, C.name
        FROM recipes
        LEFT JOIN chefs C ON (recipes.chef_id = C.id)
        ORDER BY recipes.id`,
      function (err, results) {
        if (err) return res.send('Database Error!')

        return res.render('adminVersion/admin', { recipes: results.rows })
      }
    )
  },

  redirect(req, res) {
    return res.redirect('/admin/recipes')
  },

  create(req, res) {
    db.query('SELECT * FROM chefs', function (err, results) {
      return res.render('adminVersion/adminRecipeCreate', { chefs: results.rows })
    })
  },

  show(req, res) {
    const { id } = req.params

    db.query(
      `SELECT *, chefs.id AS chef_id
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = ($1)`,
      [id],
      function (err, results) {
        if (err) return res.send('Database Error!')

        let recipe = results.rows[0]
        if (!recipe) return res.send('Recipe not found!')

        return res.render('adminVersion/adminRecipeDetails', { recipe: results.rows[0] })
      }
    )
  },

  post(req, res) {
    //FIELD VALIDATION
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] === '') {
        return res.send('Preencha todos os campos!')
      }
    }

    //GET CREATION DATE
    const created_at = new Date().getTime() / 1000

    const query = `
        INSERT INTO recipes(
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at,
        chef_id
    ) VALUES($1, $2, $3, $4, $5, TO_TIMESTAMP($6), $7)
        RETURNING id
        `
    const values = [
      req.body.image,
      req.body.title,
      req.body.ingredients,
      req.body.preparation,
      req.body.information,
      created_at,
      req.body.chef
    ]

    db.query(query, values, function (err, results) {
      if (err) {
        console.log(err)
        return res.send('Database Error!')
      }

      return res.redirect(`/admin/recipes/${results.rows[0].id}`)
    })
  },

  put(req, res) {
    const { id } = req.params
    const query = `
        UPDATE recipes SET
        image = ($1),
        title = ($2),
        ingredients = ($3),
        preparation = ($4),
        information = ($5),
        chef_id = ($7)
        WHERE id = ($6)
        `
    const values = [
      req.body.image,
      req.body.title,
      req.body.ingredients,
      req.body.preparation,
      req.body.information,
      req.params.id,
      req.body.chef
    ]

    db.query(query, values, function (err, results) {
      if (err) {
        console.log(err)
        return res.send('Database Error!')
      }
      return res.redirect(`/admin/recipes/${id}`)
    })
  },

  async edit(req, res) {
    const { id } = req.params

    const recipe = await queryDb(
      `SELECT *
        FROM recipes 
        WHERE recipes.id = $1`,
      [id]
    ).then((results) => results.rows[0])
    const chefs = await queryDb(`SELECT * from chefs`).then((results) => results.rows)
    res.render('adminVersion/adminRecipeEdit', { recipe, chefs })
  },

  delete(req, res) {
    const query = `
        DELETE from recipes
        WHERE id = ($1)
        `
    const values = [req.params.id]

    db.query(query, values, function (err, results) {
      if (err) {
        console.log(err)
        return res.send('Database Error!')
      }
      return res.redirect(`/admin/recipes`)
    })
  },

  // ------- CHEFS

  chefs_create(req, res) {
    return res.render('adminVersion/adminChefCreate')
  },

  chefs_index(req, res) {
    db.query(`SELECT * FROM chefs ORDER BY created_at`, function (err, results) {
      if (err) return res.send('Database Error!')

      return res.render('adminVersion/adminChefs', { chefs: results.rows })
    })
  },

  chefs_show(req, res) {
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

        return res.render('adminVersion/adminChefDetails', {
          chef: results.rows[0],
          recipes: results.rows
        })
      }
    )
  },

  chefs_post(req, res) {
    //FIELD VALIDATION
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] === '') {
        return res.send('Preencha todos os campos!')
      }
    }

    //GET CREATION DATE
    const created_at = new Date().getTime() / 1000

    const query = `
        INSERT INTO chefs (
        avatar_url,
        name,
        created_at
    ) VALUES($1, $2, TO_TIMESTAMP($3))
        RETURNING id
        `
    const values = [req.body.avatar_url, req.body.name, created_at]

    db.query(query, values, function (err, results) {
      if (err) {
        console.log(err)
        return res.send('Database Error!')
      }

      return res.redirect(`/admin/chefs/${results.rows[0].id}`)
    })
  },

  chefs_edit(req, res) {
    const { id } = req.params
    db.query(`SELECT * FROM chefs WHERE id = ($1)`, [id], function (err, results) {
      if (err) return res.send('Database error!')

      return res.render(`adminVersion/adminChefEdit`, { chef: results.rows[0] })
    })
  },

  chefs_put(req, res) {
    const { id } = req.params
    const query = `
        UPDATE chefs SET
        avatar_url = ($1),
        name = ($2)
        WHERE id = ($3)
        `
    const values = [req.body.avatar_url, req.body.name, req.params.id]

    db.query(query, values, function (err, results) {
      if (err) {
        console.log(err)
        return res.send('Database Error!')
      }
      return res.redirect(`/admin/chefs/${id}`)
    })
  },

  chefs_delete(req, res) {
    const query = `
        DELETE from chefs
        WHERE id = ($1)
        `
    const values = [req.params.id]

    db.query(query, values, function (err, results) {
      if (err) {
        console.log(err)
        return res.send('Database Error!')
      }
      return res.redirect(`/admin/chefs`)
    })
  }
}

function queryDb(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
      if (err) return reject(err)
      return resolve(results)
    })
  })
}

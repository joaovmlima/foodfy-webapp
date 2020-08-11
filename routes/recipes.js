const db = require('../src/db')

//ROTAS PARA ADMINISTRATIVO
//  ------- RECIPES

exports.index = function (req, res) {
  db.query(`SELECT recipes.id, recipes.image, recipes.ingredients, recipes.preparation, recipes.information, recipes.title, C.name
        FROM recipes
        LEFT JOIN chefs C ON (recipes.chef_id = C.id)
        ORDER BY recipes.id`, function (err, results) {
    if (err) return res.send('Database Error!')

    return res.render("adminVersion/admin", { recipes: results.rows })
  })
}

exports.redirect = function (req, res) {
  return res.redirect("/admin/recipes")
}

exports.create = function (req, res) {

  db.query('SELECT * FROM chefs', function (err, results) {
    return res.render("adminVersion/adminRecipeCreate", { chefs: results.rows })
  })
}

exports.show = function (req, res) {
  const { id } = req.params

  db.query(`SELECT *, chefs.id AS chef_id
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = ${id}`,
    function (err, results) {
      if (err) return res.send('Database Error!')

      let recipe = results.rows[0]
      if (!recipe) return res.send("Recipe not found!")

      return res.render("adminVersion/adminRecipeDetails", { recipe: results.rows[0] })
    })


}

//CREATE/PUSH NEW RECIPES TO DB
exports.post = function (req, res) {
  //FIELD VALIDATION
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] === "") {
      return res.send("Preencha todos os campos!")
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
}

//EDIT RECIPES
exports.put = function (req, res) {
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
}

function queryDb(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) return reject(err)
      return resolve(results)
    })
  })
}

exports.edit = async function (req, res) {
  const { id } = req.params

  const recipe = await queryDb(`SELECT *
        FROM recipes 
        WHERE recipes.id = ${id}`)
    .then((results) => results.rows[0])
  const chefs = await queryDb(`SELECT * from chefs`)
    .then((results) => results.rows)
  res.render('adminVersion/adminRecipeEdit', { recipe, chefs })
}

//DELETE RECIPES
exports.delete = function (req, res) {
  const { id } = req.params
  const query = `
        DELETE from recipes
        WHERE id = ($1)
        `
  const values = [
    req.params.id
  ]

  db.query(query, values, function (err, results) {
    if (err) {
      console.log(err)
      return res.send('Database Error!')
    }
    return res.redirect(`/admin/recipes`)
  })
}

//  ------- CHEFS
exports.chefs_create = function (req, res) {
  return res.render("adminVersion/adminChefCreate")
}

exports.chefs_index = function (req, res) {

  db.query(`SELECT * FROM chefs`, function (err, results) {
    if (err) return res.send('Database Error!')

    return res.render("adminVersion/adminChefs", { chefs: results.rows })
  })
}

exports.chefs_show = function (req, res) {
  const { id } = req.params

  db.query(`SELECT *, chefs.id AS chef_id
            from chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = ${id}`,
    function (err, results) {
      if (err) return res.send("Database Error!")

      let chef = results.rows
      if (!chef) return res.send("Chef not found!")

      return res.render("adminVersion/adminChefDetails", { chef: results.rows[0], recipes: results.rows })
    })

}

//PUSH NEW CHEF TO DB
exports.chefs_post = function (req, res) {
  //FIELD VALIDATION
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] === "") {
      return res.send("Preencha todos os campos!")
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
  const values = [
    req.body.avatar_url,
    req.body.name,
    created_at
  ]

  db.query(query, values, function (err, results) {
    if (err) {
      console.log(err)
      return res.send('Database Error!')
    }

    return res.redirect(`/admin/chefs/${results.rows[0].id}`)
  })
}

//EDIT CHEF
exports.chefs_edit = function (req, res) {
  const { id } = req.params
  db.query(`SELECT * FROM chefs WHERE id = ${id}`, function (err, results) {
    if (err) return res.send('Database error!')

    return res.render(`adminVersion/adminChefEdit`, { chef: results.rows[0] })
  })
}

//DELETE CHEF
exports.chef_delete = function (req, res) {
  const query = `
        DELETE from chefs
        WHERE id = ($1)
        `
  const values = [
    req.params.id
  ]

  db.query(query, values, function (err, results) {
    if (err) {
      console.log(err)
      return res.send('Database Error!')
    }
    return res.redirect(`/admin/recipes`)
  })
}
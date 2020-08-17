const { Client } = require('pg')

const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:foodfy@localhost:5050/foodfy',
    ssl: !!process.env.DATABASE_URL
})

client.connect()

client.query('SELECT * FROM recipes, chefs;', (err, res) => {
    if (err) throw err
})

module.exports = client
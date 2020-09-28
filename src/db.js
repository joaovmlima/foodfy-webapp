const { Client } = require('pg')

const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:foodfy@192.168.0.42:5050/foodfy',
    ssl: false
})

client.connect()

client.query('SELECT * FROM recipes, chefs;', (err, res) => {
    if (err) throw err
})

module.exports = client
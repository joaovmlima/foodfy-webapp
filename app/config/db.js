const { Client } = require('pg')

const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@192.168.1.42:5432/postgres',
    ssl: false
})

client.connect()

client.query('SELECT * FROM recipes, chefs;', (err, res) => {
    if (err) throw err
})

module.exports = client
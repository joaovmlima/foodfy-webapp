const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const routes = require('../routes/index')
const adminRoutes = require('../routes/admin')
const methodOverride = require('method-override')

server.set('view engine', 'njk')
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(methodOverride('_method'))
server.use(routes)
server.use(adminRoutes)

nunjucks.configure('app/views', {
  express: server,
  noCache: true
})

server.listen(process.env.PORT || 3000, function () {
  console.log('Server is up!')
})

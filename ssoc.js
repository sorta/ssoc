var express = require('express'),
  logger = require('morgan'),
  path = require('path'),
  favicon = require('serve-favicon'),
  app = express(),
  compression = require('compression'),
  slash = require('express-slash'),
  uncapitalize = require('express-uncapitalize')

app.use(compression())
app.use('/static/', express.static(path.join(__dirname, 'public')))
app.use('/static/docs/', express.static(path.join(__dirname, 'docs')))
app.use(favicon(path.join(__dirname, '/favicon.ico')))

app.enable('strict routing')
var router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict       : app.get('strict routing')
})
app.use(uncapitalize())
app.use(router)

app.locals.basedir = __dirname
app.set('view engine', 'pug')

// Routes
app.get('/', function (req, res) {
  res.render('index', { currentPage: 'Home' })
})

app.get('/about/', function (req, res) {
  res.render('about', { currentPage: 'About' })
})

// Slashes redirect
app.use(slash())

// 404
app.use(function (req, res, next) {
  res.status(404).render('404', { currentPage: '404' })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})

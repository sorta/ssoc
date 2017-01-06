var express = require('express'),
  logger = require('morgan'),
  path = require('path'),
  favicon = require('serve-favicon'),
  app = express(),
  compression = require('compression')

app.use(compression())
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/static/docs', express.static(path.join(__dirname, 'docs')))
app.use(favicon(path.join(__dirname, '/favicon.ico')))

app.locals.basedir = __dirname

app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey' })
})

app.get('/about/', function (req, res) {
  res.render('about', { title: 'Hey' })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})

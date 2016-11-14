var express = require('express'),
  logger = require('morgan'),
  app = express(),
  app.use('/static', express.static(path.join(__dirname, 'public'))),
  app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey' })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})

var express = require('express'),
    logger = require('morgan'),
    app = express(),
    app.use('/static', express.static(path.join(__dirname, 'public'))),
    app.set('view engine', 'pug');

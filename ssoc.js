const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const compression = require('compression');
const slash = require('express-slash');
const uncapitalize = require('express-uncapitalize');
const projectData = require('./src/project-data');

const app = express();
const appPort = process.env.PORT || 3000;


app.use(compression());
app.use('/static/', express.static(path.join(__dirname, 'public')));
app.use('/static/docs/', express.static(path.join(__dirname, 'docs')));
app.use(favicon(path.join(__dirname, '/favicon.ico')));

app.enable('strict routing');
const router = express.Router({
  caseSensitive: app.get('case sensitive routing'),
  strict: app.get('strict routing'),
});
app.use(uncapitalize());
app.use(router);

app.locals.basedir = __dirname;
app.set('view engine', 'pug');

// Routes
app.get('/', (req, res) => {
  res.render('index', { currentPage: 'Home' });
});

app.get('/about/', (req, res) => {
  res.render('about', { currentPage: 'About' });
});

app.get('/work/', (req, res) => {
  res.render('work', { currentPage: 'Work', managers: projectData });
});


app.get('/work/:manager', (req, res) => {
  if (!{}.hasOwnProperty.call(projectData, req.params.manager)) {
    res.status(404).render('404', { currentPage: '404' });
  } else {
    const managerData = {};
    managerData[req.params.manager] = projectData[req.params.manager];
    res.render('work', { currentPage: 'Work List', managers: managerData });
  }
});

// Slashes redirect
app.use(slash());

// 404
app.use((req, res) => {
  res.status(404).render('404', { currentPage: '404' });
});

app.listen(appPort, () => {
  console.log(`Listening on http://localhost: ${(appPort)}`);
});

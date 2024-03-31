const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');
require('./data/reddit-db');
require('dotenv').config();

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cookieParser());

// MIDDLEWARES

app.use(checkAuth);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Routes
require('./controllers/posts')(app);
require('./controllers/comments')(app);
require('./controllers/auth')(app);
require('./controllers/replies.js')(app);

app.listen(3000);
module.exports = app;

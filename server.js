const express = require('express');
const { engine } = require('express-handlebars');
require('./data/reddit-db');
require('dotenv').config();

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// Routes
require('./controllers/posts')(app);
require('./controllers/comments')(app);
require('./controllers/auth')(app);

app.listen(3000);
module.exports = app;
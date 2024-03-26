const express = require('express');
const { engine } = require('express-handlebars');
require('./data/reddit-db');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: false }));






// Routes
require('./controllers/posts')(app);

app.listen(3000);
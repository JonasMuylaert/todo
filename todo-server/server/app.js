//public imports
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

//local imports
const todoRoutes = require('./api/todos/todoRoutes');
const { notFound, errorHandler } = require('./middlewares/404');

//init
const app = express();

//general middleware
app.use(express.json()); //body parser
app.use(cors()); //cross origing
app.use(morgan('tiny')); //Request LOG
app.use(compression()); //compresses incoming requests
app.use(helmet()); //secure headers

//ROUTES
app.use('/api/v1', todoRoutes);

app.use(notFound); //ALTIJD LAATST
app.use(errorHandler); //ALTIJD LAATST

module.exports = app;

//PACKAGES
require('dotenv').config();
const express = require('express');
const pool = require('./util/db');
const cors = require('cors');

const app = express();
//GLOBAL VARIABLES
const PORT = process.env.SERVER_PORT || 5000;
//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});

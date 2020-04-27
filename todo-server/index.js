const express = require('express');
const pool = require('./util/db');
const cors = require('cors');

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});

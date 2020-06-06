//PACKAGES
require('dotenv').config();

const app = require('./app');
//GLOBAL VARIABLES
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
	console.log(`listening on: http://localhost:${PORT}`);
});

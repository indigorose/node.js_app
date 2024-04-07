const express = require('express');
const dotenv = require('dotenv'); // Hide passwords important information
const morgan = require('morgan'); // Allows us to see activity in the console
const connectDB = require('./config/db'); // Cloud database connection
const path = require('path');
// Load config

dotenv.config({ path: './config/config.env' }); // Hide passwords and information

connectDB(); // Database connection

const app = express();

//Logging, this will check that we are in development to use morgan in the terminal.
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Handlebars - This is the view engine to render the pages, similar to ejs.
app.set('views', path.join(__dirname, './views/layouts'));
app.set('view engine', 'ejs');

// Routes

app.use('/', require('./routes/index.js'));

// Listening Port
const PORT = process.env.PORT;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);

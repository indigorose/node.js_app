const express = require('express');
const dotenv = require('dotenv'); // Hide passwords important information
const morgan = require('morgan'); // Allows us to see activity in the console
const connectDB = require('./config/db'); // Cloud database connection
import { engine } from 'express-handlebars';
// Load config

dotenv.config({ path: './config/config.env' }); // Hide passwords and information

connectDB(); // Database connection

const app = express();

//Logging, this will check that we are in development to use morgan in the terminal.
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Handlebars - This is the view engine to render the pages, similar to ejs.
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Routes

app.use('/', require('./routes/index'));

// Listening Port
const PORT = process.env.PORT;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);

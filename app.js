const express = require('express');
const dotenv = require('dotenv'); // Hide passwords important information
const morgan = require('morgan'); // Allows us to see activity in the console
const connectDB = require('./config/db'); // Cloud database connection
const passport = require('passport');
const session = require('express-session');
const path = require('path');

// Load config
dotenv.config({ path: './config/config.env' }); // Hide passwords and information

// Passport config
require('./config/passport.js')(passport);

connectDB(); // Database connection

const app = express();

//Logging, this will check that we are in development to use morgan in the terminal.
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// EJS config - Wanted to test using handlebars, however depreciation affected the setup.
app.set('views', [
	__dirname + '/views/layouts',
	__dirname + '/views',
	__dirname + '/views/partials',
]);
app.set('view engine', 'ejs');

// Static folders - CSS styling
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/auth.js'));

// Listening Port
const PORT = process.env.PORT;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Hide passwords important information
const morgan = require('morgan'); // Allows us to see activity in the console
const connectDB = require('./config/db'); // Cloud database connection
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const { engine } = require('express-handlebars');

// Load config
dotenv.config({ path: './config/config.env' }); // Hide passwords and information

// Passport config
require('./config/passport.js')(passport);

connectDB(); // Database connection

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging, this will check that we are in development to use morgan in the terminal.
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.engine(
	'hbs',
	engine({
		extname: 'hbs',
		defaultLayout: 'main',
		layoutsDir: 'views/layouts/',
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

// Static folders - CSS styling
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
console.log('Mongoose connection:', mongoose.connection);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/stories.js'));

// Listening Port
const PORT = process.env.PORT;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);

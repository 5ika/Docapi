//////////////////
// Requirements //
//////////////////
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var user = require('./routes/user');
var api = require('./routes/api');
var shared = require('./routes/shared');
var config = require('./config');
var shell = require('shelljs');

var app = express();

///////////
// Setup //
///////////

//Test if pandoc is installed
if (!shell.which('pandoc')) {
	console.log(
		'[PANDOC] Pandoc n\'est pas installé. Vous ne pourrez pas utiliser la conversion en PDF.'
	);
} else console.log("Pandoc est installé");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Environnment setup
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// Express setup
/// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

mongoose.connect(config.db.server);

// Passport setup
require('./config/passport')(passport);
app.use(session({
	secret: 'japprecielesfruitsausirop',
	resave: true,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

////////////
// Routes //
////////////
app.use('/share', shared);
app.use('/', routes);
app.use('/user', user);
app.use('/api', api);

////////////////////
// error handlers //
////////////////////

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err,
			title: 'error'
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {},
		title: 'error'
	});
});

module.exports = app;

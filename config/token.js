//
// Gestion des tokens des utilisateurs
//
var jwt = require('jwt-simple');
var User = require('./user-model');

var selection = {};
var secret = "8]d5Gz,Q.e5|R}CdfgUl>J-<F";
var expireDays = 7;

// route middleware to make sure user uses a valid auth token
selection.isValidToken = function(req, res, next) {
	var token = (req.body && req.body.access_token) || (req.query && req.query
		.access_token) || req.headers['x-access-token'];

	// if user token is valid, carry on
	if (isValid(token, function(user) {
			req.user = user;
		})) {
		return next();
	}

	// if it isn't, send error message
	res.status(401).json({
		error: 'Your token is not valid'
	});
};

// Indique si un token est valide ou non
selection.isValid = function(token, setUser) {
	try {
		var decodedToken = jwt.decode(token, secret);
		if (decodedToken.exp >= Date.now()) {
			User.findOne({
				_id: decodedToken.iss
			}, function(err, user) {
				if (!err) setUser(user);
			});
		}
	} catch (err) {
		setUser(null);
	}
};

// Calcul et retourne un token pour un utilisateur donné
selection.getToken = function(userID) {
	var expires = Date.now() + expireDays * 86400000;
	var token = jwt.encode({
		iss: userID,
		exp: expires
	}, secret);
	return {
		value: token,
		expire: expires,
		user: userID
	};
};

module.exports = selection;

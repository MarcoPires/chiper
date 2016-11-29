/**
 * npm modules
 */
var passport       = require('passport');
var localStrategy  = require('passport-local');
var locallyDB      = require('locallydb');
var crypto         = require('crypto');



var db    = new locallyDB('./.data');
var users = db.collection('users');

/**
 * Convert the user password in to a hash
 * @param  {string} password 
 * @return {string} hash         
 */
var hash = function(password){
	return crypto.createHash('sha512').update(password).digest('hex');
};

/**
 * Ensure that user is logged in to access protected routes
 * @param  {object}   req  
 * @param  {object}   res  
 * @param  {Function} next 
 */
var loginRequired = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	};

	res.redirect('/login');
};


var makeUserSafe = function(user){
	var safeUser = {},
		safeKeys = ['cid', 'fullname', 'email', 'username', 'following'];

	safeKeys.forEach(function(key){
		safeUser[key] = user[key];
	});

	return safeUser;
};




/**
 * Check if is a valid user, and send it to localStrategy
 * @param  {string} username 
 * @param  {string} password 
 * @param  {function} done
 */
passport.use(new localStrategy(function(username, password, done) {
	var user = users.where({ username: username, passwordHash: hash(password) }).items[0]
	
	/**
	 * After check if the user exist in the db,
	 * fall back to the done method, with the error param and the user if exist
	 */
	done(null, (user ? user : false));
}));

/**
 * Serialize user into a token
 * @param  {string} username 
 * @param  {function} done
 */
passport.serializeUser(function(user, done){
	/**
	 * Send the user id as a form of serialize it
	 */
	done(null, user.cid);
});

/**
 * Resolve the serialized token into a user
 * @param  {string} username 
 * @param  {function} done
 */
passport.deserializeUser(function(cid, done){
	/**
	 * Send the user that match the cid
	 */
	done(null, users.get(cid));
});


exports.passport      = passport;
exports.users         = users;
exports.hash          = hash;
exports.loginRequired = loginRequired;
exports.makeUserSafe  = makeUserSafe;
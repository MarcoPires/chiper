/**
 * npm modules
 */
var router = require('express').Router();

/**
 * local modules
 */
var login = require('./login');



var passport = login.passport;
var users    = login.users;
var hash     = login.hash;

router.get('/login', function(req, res){
	res.render('login');
});

/**
 * This will bind the passport user validation, that was done in the configurations (passport.use)
 */
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
}));

router.post('/signup', function(req, res, next){
	var body   = req.body,
		user   = {},
		userId = 0;

	if(!users.where({ username: body.username }).items.length){
		user = {
			fullname     : body.fullname,
			email        : body.email,
			username     : body.username,
			passwordHash : hash(body.password),
			following    : []
		};

		/**
		 * Create the user in the db
		 * @type {[type]}
		 */
		userId = users.insert(user);

		/**
		 * User the passport method login, to login the user after the sign up
		 */
		req.login(users.get(userId), function(error){
			if(error) return next(error);

			res.redirect('/');
		});

		return;
	};

	/**
	 * The user already exists, so it needs to login
	 */
	res.redirect('/login');
});

router.get('/logout', function(req, res){
	
	/**
	 * User the passport method logout
	 */
	console.log("ENTRA")
	req.logout();
	res.redirect('/login');
});


exports.routers = router;
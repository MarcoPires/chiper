/**
 * npm modules
 */
var router    = require('express').Router();
var locallyDB = require('locallydb');

/**
 * local modules
 */
var login = require('./login');




var db     = new locallyDB('./.data');
var chirps = db.collection('chirps');
var users  = db.collection('users');

router.route('/api/chirps')
	.all(login.loginRequired)
	/**
	 * Get all chirps
	 * @param  {object} req
	 * @param  {object} res
	 */
	.get(function(req, res){
		res.json(chirps.toArray());
	})
	/**
	 * Post a new chirp
	 * @param  {object} req
	 * @param  {object} res
	 */
	.post(function(req, res){
		var chirp = req.body,
			id 	  = 0;

		chirp.userId = req.user.cid;

		// TO BE REMOVED
		chirp.username = req.user.username;
		chirp.fullname = req.user.fullname;
		chirp.email    = req.user.email;

		id = chirps.insert(chirp);
		res.json(chirps.get(id));
	});

router.route('/api/users')
	/**
	 * Get all Users
	 * @param  {object} req
	 * @param  {object} res
	 */
	.get(function(req, res){
		res.json(
			users.toArray().map(login.makeUserSafe));
	});

exports.routers = router;
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

/**
 * Following user
 * @param  {object} req
 * @param  {object} res
 */
router.post('/api/follow/:id', function(req, res){
		var id = parseInt(req.params.id, 10);
		
		if(req.user.following.indexOf(id) < 0){
			req.user.following.push(id);
			users.update(req.user.cid, req.user);
		};

		res.json(login.makeUserSafe(req.user));
	});

/**
 * Unfollowing user
 * @param  {object} req
 * @param  {object} res
 */
router.post('/api/unfollow/:id', function(req, res){
		var id    = parseInt(req.params.id, 10);
		var index = req.user.following.indexOf(id);
		
		if(index > -1){
			req.user.following.splice(index, 1);
			users.update(req.user.cid, req.user);
		};

		res.json(login.makeUserSafe(req.user));
	});


exports.routers = router;
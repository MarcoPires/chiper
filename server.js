/**
 * npm modules
 */
var express = require('express');

/**
 * local modules
 */
var router = require('./router');
var login  = require('./login');



express()
	.set('view engine', 'ejs')
	.use(express.static('./public'))
	.use(router.routers)
	.get('*', login.loginRequired, function(req, res){
		res.render('index', {
			user: login.makeUserSafe(req.user)
		});
	})
	.listen(3000);
var express = require('express');
var login   = require('./login');

express()
	.set('view engine', 'ejs')
	.use(express.static('./public'))
	.use(login.routers)
	.get('*', function(req, res){
		res.render('index');
	})
	.listen(3000);
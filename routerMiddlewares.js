/**
 * npm modules
 */
var router         = require('express').Router();
var expressSession = require('express-session');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');

/**
 * local modules
 */
var login = require('./login');



var passport = login.passport;
var users    = login.users;
var hash     = login.hash;

/**
 * This will parse any url with encoded data into a object,
 * it will be used in the login page
 */
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Will convert the data sended to the API into JSON
 */
router.use(bodyParser.json());

/**
 * Parse the cookie sended in the requests so we can track the user serialized token
 */
router.use(cookieParser());


router.use(expressSession({
	secret            : 'oafajlçfaojiwa892e8ydhmcapw554afag6',
	resave            : false,
	saveUninitialized : true
}));

/**
 * Bind the passport middleware with the express
 */
router.use(login.passport.initialize());
router.use(login.passport.session());

exports.routers = router;
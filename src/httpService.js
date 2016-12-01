/**
 * npm modules
 * * * Solve IE incompatibility with es6 promises and fetch
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

/**
 * local modules
 */
var actions  = require('./actions');




var httpService = {
	
	fetchChirps: function(){

		get('/api/chirps').then( actions.gotChirps.bind(actions) );
	}
};

var get = function(url){
	return fetch(url, {
		/**
		 * this will tell the browser to handle this request as any other,
		 * and inform the server of it origin. And to do that the browser ill send the cookie.
		 * @type {String}
		 */
		credentials: 'same-origin'
	}).then(function(response){
		return response.json();
	});
};

module.exports = httpService;
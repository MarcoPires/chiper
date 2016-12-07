/**
 * npm modules
 * * * Solve IE incompatibility with es6 promises and fetch
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

/**
 * local modules
 */
var actions    = require('./actions');
var dispatcher = require('./dispatcher');
var constants  = require('./constants');

dispatcher.register(function(action){

	switch(action.actionType){
		case constants.CHIRP:
			httpService.saveChirp(action.data);
			break;
		case constants.FOLLOW:
			httpService.follow(action.data);
			break;
		case constants.UNFOLLOW:
			httpService.unfollow(action.data);
			break;
	};
});

var httpService = {
	
	fetchChirps: function(){
		get('/api/chirps').then( actions.gotChirps.bind(actions) );
	},	

	fetchUsers: function(){
		get('/api/users').then( actions.gotUsers.bind(actions) );
	},

	saveChirp: function(text){
		text = text.trim();
		if(!text) return;

		post('/api/chirps', { text: text }).then( actions.chirped.bind(actions) );
	},

	follow: function(id){
		if(id === undefined) return;

		post('/api/follow/' + id).then( actions.followed.bind(actions) );
	},

	unfollow: function(id){
		console.log("ENTRA", id)
		if(id === undefined) return;

		post('/api/unfollow/' + id).then( actions.unfollowed.bind(actions) );
	},
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

var post = function(url, body){
	console.log("AKI")
	return fetch(url, {
		method      : 'POST',
		credentials : 'include',
		body        : JSON.stringify(body || {}),
		headers 	: {
			'Content-Type' : 'application/json',
			'Accept'       : 'application/json'
		}
	}).then(function(response){
		return response.json();
	});
};

module.exports = httpService;
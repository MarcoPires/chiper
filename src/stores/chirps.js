/**
 * local modules
 */
var constants = require('../constants');
var store     = require('./store');
var userStore = require('./users');

/**
 * Chirps store extends the base store, and will handle chirps data.
 */
var chirps = store.extend({

	instanceOf: 'Chirps',

	init: function(){
		/**
		 * Every time a new chirps come from the API, this store will know
		 * and it'll perform an action
		 */
		this.bind(constants.GOT_CHIRPS, this.set);

		/**
		 * Bind an action when a chirp has saved, and add it to the store
		 */
		this.bind(constants.CHIRPED, this.add);
	},
	
	/**
	 * Will return the chirps created by the current user and by users followed by him.
	 * @return {array} chirps list
	 */
	timeline: function(){
		var currentUser = userStore.getCurrentUser();
		var ids         = [currentUser.cid].concat(currentUser.following);

		return this._data.filter(function(chirp){
			return ids.indexOf(chirp.userId) > -1;
		});
	},
	
	/**
	 * Returns all chirps created by a given user id
	 * @param  {number} id 
	 * @return {array} chirps
	 */
	getByUserId: function(id){
		return this._data.filter(function(chirp){
			return chirp.userId === id;
		});
	}

});

module.exports = chirps;
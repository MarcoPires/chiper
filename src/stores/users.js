/**
 * local modules
 */
var constants = require('../constants');
var store     = require('./store');



/**
 * Users store extends the base store, and will handle users data.
 */
var UserStore = store.extend({

	instanceOf: 'User',

	currentUser: {},

	init: function(){

		/**
		 * Every time a new user come from the API, this store will know
		 * and it'll perform an action
		 */
		this.bind(constants.GOT_USERS, this.set);

		/**
		 * Every time a user follow or unfollow another user and the API sends a confirmation, 
		 * this store will know and it'll perform an action
		 */
		this.bind(constants.FOLLOWED, this.updateUser);
		this.bind(constants.UNFOLLOWED, this.updateUser);

		this.updateUser(USER);
	},

	updateUser: function(data){
		this.currentUser = data;
	},

	getCurrentUser: function(){
		return this.currentUser;
	}
});

module.exports = UserStore;
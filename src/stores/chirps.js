/**
 * local modules
 */
var constants  = require('../constants');
var store = require('./store');


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
	}


});

module.exports = chirps;
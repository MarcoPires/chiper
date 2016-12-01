/**
 * local modules
 */
var dispatcher = require('./dispatcher');
var constants  = require('./constants');

/**
 * Will generate automatically a function per action, in the constants object
 * This will be the format of each function:
 * 
 * ****exports.chirp = function(data){
 * *******dispatcher.dispatch({
 * ***********actionType : constants[KEY],
 * ***********data       : data
 * *******});
 * ****};
 * 
 * @param  {String} key
 */
Object.keys(constants).forEach(function (key) {

	/**
	 * Convert the a constant key into a CamelCase name
	 * @param  {string} word 
	 * @param  {number} i index
	 * @return {array}      
	 */
    var funcName = key.split('_').map(function (word, i) {
        if (i === 0) return word.toLowerCase();
        return word[0] + word.slice(1).toLowerCase();
    }).join('');

    /**
     * Create a dispatch for each action type
     */
    exports[funcName] = function (data) {
        dispatcher.dispatch({
            actionType: constants[key],
            data: data
        });
    };
});

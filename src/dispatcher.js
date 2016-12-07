/**
 * npm modules
 */
var flux = require('flux');



var dispatcher = new flux.Dispatcher();

dispatcher.register(function(action){
	console.log("2) Dispatcher triggered -> " + action.actionType);
});

module.exports = dispatcher;
/**
 * npm modules
 */
var assign            = require('object-assign');
var EventEmitterProto = require('events').EventEmitter.prototype;

/**
 * local modules
 */
var dispatcher = require('../dispatcher');




var CHANGE_EVENT = 'CHANGE';
var storeMethods = {

	init: function(){return this;}, 

	set: function(arr){
		var currIds 	= this._data.map(function(item){ return item.cid }),
			uniqueItems = arr.filter(function(item){ return currIds.indexOf(item.cid) === -1; });

		uniqueItems.forEach(this.add.bind(this));
		return this;
	},

	add: function(item){
		this._data.push(item);
		return this;
	},

	getAll: function(){
		return this._data;
	},

	getById: function(id){
		return this._data.filter(function(item){ return item.cid === id })[0];
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
		return this;
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
		return this;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
		return this;
	},

	bind: function(actionType, actionCallback) {
		if(!this.actions[actionType]) this.actions[actionType] = [];
		this.actions[actionType].push(actionCallback);
		return this;
	}
};

exports.extend = function(methods){
	var store = {
		_data   : [],
		actions : {}
	};

	/**
	 * Extends the class methods
	 */
	assign(store, EventEmitterProto, storeMethods, methods);
	
	/**
	 * Class constructor
	 */
	store.init();

	/**
	 * Any action dispatched will past here.
	 * Verify if is any compatible action binded in the store, and call it.
	 */
	dispatcher.register(function(action){
		console.log("2) Dispatcher triggered -> Store listening: " + store.instanceOf);
		var bindedAction = store.actions[action.actionType];
		
		if(!bindedAction) return this;

		bindedAction.forEach(function(callback){
			console.log("3) Store binded action -> " + action.actionType + ": " + store.instanceOf + ":" + (callback.name ? callback.name : callback.toString()));
			callback.call(store, action.data);
		});
	});

	return store;
};
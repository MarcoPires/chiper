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

	/**
	 * Save a list of uniques items, 
	 * each item must contains a cid property
	 * @param {array} list
	 */
	set: function(list){
		var currIds 	= this._data.map(function(item){ return item.cid }),
			uniqueItems = list.filter(function(item){ return currIds.indexOf(item.cid) === -1; });

		uniqueItems.forEach(this.add.bind(this));
		return this;
	},

	/**
	 * Save a single item
	 * @param {object} item 
	 */
	add: function(item){
		this._data.push(item);
		return this;
	},

	/**
	 * Returns all saved items
	 * @return {array} 
	 */
	getAll: function(){
		return this._data;
	},

	/**
	 * Returns a item that matchs id
	 * @param  {number} id
	 * @return {object}    
	 */
	getById: function(id){
		return this._data.filter(function(item){ return item.cid === id })[0];
	},

	/**
	 * Registers a function interested in state changes
	 * @param {function} callback 
	 */
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
		return this;
	},
	/**
	 * Unregisters a function that is not any longer interested in state changes
	 * @param  {function} callback 
	 */
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
		return this;
	},

	/**
	 * Informs all the interested in the state change
	 */
	emitChange: function() {
		this.emit(CHANGE_EVENT);
		console.log("4) " + this.instanceOf + " store emitted a change");
		return this;
	},

	/**
	 * Binds actions to state changes
	 * @param  {string} actionType     
	 * @param  {function} actionCallback 
	 */
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
		var bindedAction = store.actions[action.actionType];
		
		if(!bindedAction) return this;

		bindedAction.forEach(function(callback){
			console.log("3) Store binded action -> " + action.actionType + ": " + store.instanceOf + ":" + (callback.name ? callback.name : callback.toString()));
			callback.call(store, action.data);
			store.emitChange();
		});
	});

	return store;
};
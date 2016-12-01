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

	assign(store, EventEmitterProto, storeMethods, methods);

	store.init();

	dispatcher.register(function(action){
		var action = store.actions[action.actionType];
		
		if(!action) return this;

		action.forEach(function(callback){
			callback.call(null, action.data);
		});
	});

	return store;
};
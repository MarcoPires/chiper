/**
 * npm modules
 */
var React = require('react');

/**
 * local modules
 */
var actions    = require('../actions');
var chirpStore = require('../stores/chirps');
var userStore  = require('../stores/users');

/**
 * Local module components
 */
var ChirpInput = require('./ChirpInput');
var ChirpList  = require('./ChirpList');




var Home = React.createClass({

	mixins: [chirpStore.mixin(), userStore.mixin()],

	getInitialState() {
		return {
			chirps: chirpStore.timeline(),
			users : userStore.getAll()
		};
	},

	saveChirp: function(text){
		actions.chirp(text);
	},

	render: function(){
		return (
			<div>
				<ChirpInput onSave={ this.saveChirp }/>
				<ChirpList chirps={ this.state.chirps } users= { this.state.users }/>
			</div>
		);
	}
});

module.exports = Home;
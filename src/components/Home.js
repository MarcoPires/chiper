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

	getInitialState() {
		return {
			chirps: chirpStore.getAll(),
			users : userStore.getAll()
		};
	},

	componentDidMount: function(){
		chirpStore.addChangeListener(this.onChange);
		userStore.addChangeListener(this.onChange);
	},

	componentWillUnmount: function(){
		chirpStore.removeChangeListener(this.onChange);
		userStore.removeChangeListener(this.onChange);
	},

	onChange: function(){
		this.setState(this.getInitialState());
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
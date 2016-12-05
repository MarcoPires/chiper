/**
 * npm modules
 */
var React = require('react');

/**
 * local modules
 */
var actions    = require('../actions');
var chirpStore = require('../stores/chirps');

/**
 * Local module components
 */
var ChirpInput = require('./ChirpInput');
var ChirpList  = require('./ChirpList');




var Home = React.createClass({

	componentDidMount: function(){
		chirpStore.addChangeListener(this.onChange);
	},

	componentWillUnmount: function(){
		chirpStore.removeChangeListener(this.onChange);
	},

	getInitialState() {
		return {
			chirps: chirpStore.getAll()
		};
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
				<ChirpList chirps={ this.state.chirps }/>
			</div>
		);
	}
});

module.exports = Home;
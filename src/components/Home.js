/**
 * npm modules
 */
var React = require('react');

/**
 * local modules
 */
var actions  = require('../actions');

/**
 * Local module components
 */
var ChirpInput = require('./ChirpInput');




var Home = React.createClass({
	
	saveChirp: function(text){
		actions.chirp(text);
	},

	render: function(){
		return (
			<div>
				<ChirpInput onSave={ this.saveChirp }/>
			</div>
		);
	}
});

module.exports = Home;
/**
 * npm modules
 */
var React = require('react');

/**
 * Local module components
 */
var ChirpBox = require('./ChirpBox');





var ReactPropTypes = React.PropTypes;

var ChirpList = React.createClass({

	propTypes: {
		chirps: ReactPropTypes.array.isRequired
	},

	render: function(){
		var chirps 	= this.props.chirps;
		console.log(chirps.length)
		var items 	= chirps.map(function(chirp){
			return (
				<ChirpBox key={ chirp.cid } chirp={ chirp } />

			);
		});

		return (
			<ul>{ items }</ul>
		);
	}
});

module.exports = ChirpList;
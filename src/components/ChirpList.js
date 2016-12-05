/**
 * npm modules
 */
var React = require('react');




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
				<li key={ chirp.cid }>
					<strong>
						{ chirp.username }
					</strong> said "{ chirp.text }"
				</li>
			);
		});

		return (
			<ul>{ items }</ul>
		);
	}
});

module.exports = ChirpList;
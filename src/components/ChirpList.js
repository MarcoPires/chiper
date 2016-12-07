/**
 * npm modules
 */
var React  = require('react');
var moment = require('moment');

/**
 * Local module components
 */
var Box = require('./Box');





var ReactPropTypes = React.PropTypes;
var getUserById    = function(users, userId){
	return users.filter(function(user){ return user.cid === userId })[0];
};

var ChirpList = React.createClass({

	propTypes: {
		chirps : ReactPropTypes.array.isRequired,
		users  : ReactPropTypes.array.isRequired
	},

	render: function(){
			
		var chirps 	= this.props.chirps;
		var users 	= this.props.users;
		var items 	= [];

		if(!chirps.length || !users.length) return <div> loading </div>
		
		items = chirps.map(function(chirp){
			return (
				<Box 
					key       = { chirp.cid }
					user      = { getUserById(users, chirp.userId) }
					timestamp = { moment(chirp.$created).fromNow() }
				>
					{ chirp.text } 
				</Box>
			);
		});

		return (
			<ul>{ items }</ul>
		);
	}
});

module.exports = ChirpList;
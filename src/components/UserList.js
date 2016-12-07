/**
 * npm modules
 */
var React  = require('react');
var Link   = require('react-router').Link;

/**
 * local modules
 */
var actions   = require('../actions');
var userStore = require('../stores/users');

/**
 * Local module components
 */
var Box = require('./Box');




var UserList = React.createClass({

	getInitialState() {
		return {
			users : userStore.getAll(),
			user  : userStore.getCurrentUser()
		};
	},

	componentDidMount: function(){
		userStore.addChangeListener(this.onChange);
	},

	componentWillUnmount: function(){
		userStore.removeChangeListener(this.onChange);
	},

	onChange: function(){
		this.setState(this.getInitialState());
	},

	render: function(){

		/**
		 * Retrieves all users except the logged in user
		 * @param  {object} user
		 * @return {array} users                
		 */
		var items = this.state.users.map(function(user){
			if(this.state.user.cid !== user.cid) return null;
			return (
				<Box key={ user.cid } user={ user }> @{ user.username } </Box>
			);
		}.bind(this));

		return (
			<ul>
				{ items } 
			</ul>
		);
	}
});

module.exports = UserList;
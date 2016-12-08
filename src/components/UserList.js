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
var Box          = require('./Box');
var FollowButton = require('./FollowButton');




var UserList = React.createClass({
	
	mixins: [userStore.mixin()],

	getInitialState() {
		return {
			users       : userStore.getAll(),
			currentUser : userStore.getCurrentUser()
		};
	},

	render: function(){

		/**
		 * Retrieves all users except the logged in user
		 * @param  {object} user
		 * @return {array} users                
		 */
		var items = this.state.users.map(function(user){
			if(this.state.currentUser.cid === user.cid) return null;
			return (
				<Box key={ user.cid } user={ user }>
					<FollowButton userId = { user.cid }/>
				</Box>
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
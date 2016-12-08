/**
 * npm modules
 */
var React  = require('react');

/**
 * local modules
 */
var actions   = require('../actions');
var userStore = require('../stores/users');


var ReactPropTypes = React.PropTypes;

var FollowButton = React.createClass({
	
	propTypes: {
		userId: ReactPropTypes.number.isRequired
	},

	mixins: [userStore.mixin()], 

	getInitialState() {
		var currentUser = userStore.getCurrentUser();

		return {
			id                 : currentUser.cid,
			currentlyFollowing : currentUser.following || []
		};
	},

	follow: function(){
		actions.follow(this.props.userId);
	},

	unfollow: function(){
		actions.unfollow(this.props.userId);
	},

	render: function(){
		var userId = this.props.userId;
		var action = {};

		if(this.state.id === userId) return ( <span> this is you! </span> );
		
		if(this.state.currentlyFollowing.indexOf(userId) > -1) {
			action = {
				text    : 'Unfollow',
				handler : this.unfollow
			};
		} else {
			action = {
				text    : 'Follow',
				handler : this.follow
			};
		};

		return (
			<button onClick={ action.handler }> { action.text } </button>
		);
	}
});

module.exports = FollowButton;
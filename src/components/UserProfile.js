/**
 * npm modules
 */
var React = require('react');

/**
 * local modules
 */
var userStore  = require('../stores/users');
var chirpStore = require('../stores/chirps');
var utils      = require('../utils');

/**
 * Local module components
 */
var FollowButton = require('./FollowButton');




var UserProfile = React.createClass({
	
	getInitialState: function(){
		var id = parseInt(this.props.params.id, 10);

		return {
			user   : userStore.getById(id),
			chirps : chirpStore.getByUserId(id)
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

	render: function(){
		var user   = this.state.user;
		var chirps = this.state.chirps;
		var items  = [];

		if(user === undefined || !chirps.length) return <div> loading </div>
		
		items = chirps.map(function(chirp, index){
			return <li key={ chirp.cid }>{ chirp.text }</li>
		});

		return (
			<div>
				<img className='two columns' src={ utils.avatar(user.email) } />
				<div className='ten columns'>
					<h1>
						{ this.state.user.fullname}
					</h1>					
					<h3 className="timestamp">
						{ this.state.user.userme}
					</h3>
					<p>				
						<FollowButton userId={ this.state.user.cid } />
					</p>
					<ul>				
						{ items }
					</ul>	
				</div>
			</div>
		);
	}
});

module.exports = UserProfile;
/**
 * npm modules
 */
var React  = require('react');
var Link   = require('react-router').Link;

/**
 * local modules
 */
var utils  = require('../utils');




var ReactPropTypes = React.PropTypes;

var Box = React.createClass({
	
	propTypes: {
		user      : ReactPropTypes.object.isRequired,
		timestamp : ReactPropTypes.string
	},

	render: function(){
		var user = this.props.user;
		var timestamp = this.props.timestamp ? 
				(' ' + String.fromCharCode(8226) + ' ' + this.props.timestamp) 
				: '';

		return (
			<li className='row chirp'>
				<Link className='two columns' to={`/user/${user.cid}`}>
					<img src={ utils.avatar(user.email) } />
				</Link>
				<div className='ten columns'>
					<p>
						<strong>
							{ user.fullname }
						</strong>
						<span className='timestamp'>
							@{ user.username } { timestamp }
						</span>
					</p>
					<p>
						{ this.props.children }
					</p>
				</div>
			</li>
		);
	}
});

module.exports = Box;
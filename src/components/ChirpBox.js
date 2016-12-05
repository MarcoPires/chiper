/**
 * npm modules
 */
var React  = require('react');
var Link   = require('react-router').Link;
var moment = require('moment');

/**
 * local modules
 */
var utils  = require('../utils');


var ReactPropTypes = React.PropTypes;

var ChirpBox = React.createClass({
	
	propTypes: {
		chirp: ReactPropTypes.object.isRequired
	},

	render: function(){
		var chirp = this.props.chirp;
		return (
			<li className='row chirp'>
				<Link className='two columns' to={`/user/${chirp.cid}`}>
					<img src={ utils.avatar(chirp.email) } />
				</Link>
				<div className='ten columns'>
					<p>
						<strong>
							{ chirp.fullname }
						</strong>
						<span className='timestamp'>
							@{chirp.username} {moment(chirp.$created).fromNow()}
						</span>
					</p>
					<p>
						{ chirp.text }
					</p>
				</div>
			</li>
		);
	}
});

module.exports = ChirpBox;
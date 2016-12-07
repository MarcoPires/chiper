/**
 * npm modules
 */
var React = require('react');
var Link   = require('react-router').Link;




var App = React.createClass({
	render: function(){
		return (
			<div>
				<div className='row'>
					<h1>
						<Link className='logo' to={`/`}>
							Chirper
						</Link>
					</h1>
				</div>
				<div className='row'>
					<div className='three columns'>
						Nav
					</div>
					<div className='nine columns'>
						{ this.props.children }
					</div>
				</div>
			</div>
		);
	}
});

module.exports = App;
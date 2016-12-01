/**
 * npm modules
 */
var React = require('react');



var App = React.createClass({
	render: function(children){
		return (
			<div>
				<div className='row'>
					<h1>
						Chirper
					</h1>
				</div>
				<div className='row'>
					<div className='three columns'>
						Nav
					</div>
					<div className='nine columns'>
						{ children }
					</div>
				</div>
			</div>
		);
	}
});

module.exports = App;
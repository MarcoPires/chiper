/**
 * npm modules
 */
var React = require('react');
var Link   = require('react-router').Link;
var ReactRouter = require('react-router');

/**
 * local modules
 */
var userStore = require('../stores/users');




var Navigation = React.createClass({
	
	getInitialState() {
		return {
			username: userStore.getCurrentUser().username
		};
	},

	render: function(){

		var location = ReactRouter.browserHistory.getCurrentLocation();
		var paths 	 = [{
			to   : '/', 
			text : 'Timeline'
		},{
			to   : '/users', 
			text : 'Users'
		}];
		var items = paths.map(function(path, index){
			var hasLink = location.pathname !== path.to ? 
				( <Link to={ path.to }> {path.text} </Link> ) :
				path.text;

			return (<li key={ index }> { hasLink } </li>);
		});

		
		return (
			<nav>
				<ul> 
					{ items }
					<li> <a href='/logout'> Logout </a> ({ this.state.username }) </li>
				</ul>
			</nav>
		);
	}
});

module.exports = Navigation;
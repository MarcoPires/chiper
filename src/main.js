/**
 * npm modules
 */
var React       = require('react');
var ReactDOM    = require('react-dom');
var ReactRouter = require('react-router');

/**
 * local modules
 */
var actions     = require('./actions');
var httpService = require('./httpService');

/**
 * Local module components
 */
var App         = require('./components/App');
var Home        = require('./components/Home');
var UserList    = require('./components/UserList');
var UserProfile = require('./components/UserProfile');


/**
 * Triggered all API data dependencies
 */
var fetchData = function(){
	actions.getChirps();
	actions.getUsers();
};

var Router     = ReactRouter.Router;
var Route      = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var routes = (
	<Router history={ ReactRouter.browserHistory }>
		<Route name="home" path="/" component={ App }>
			<IndexRoute component={ Home } />
			<Route name="users" path="/users" component={ UserList } />
			<Route name="user" path="/user/:id" component={ UserProfile } />
		</Route>
	</Router>
);

fetchData();
ReactDOM.render(routes, 
	document.getElementById('app'));
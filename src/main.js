/**
 * npm modules
 */
var React       = require('react');
var ReactDOM    = require('react-dom');
var ReactRouter = require('react-router');

/**
 * local modules
 */
var httpService = require('./httpService');
var chirps      = require('./stores/chirps');

/**
 * Local module components
 */
var App = require('./components/App');
var Home = require('./components/Home');

httpService.fetchChirps();

var Router     = ReactRouter.Router;
var Route      = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var routes = (
	<Router history={ ReactRouter.browserHistory }>
		<Route path="/" component={ App }>
			<IndexRoute component={ Home } />
		</Route>
	</Router>
);

ReactDOM.render(routes, 
	document.getElementById('app'));
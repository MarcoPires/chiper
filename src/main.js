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




var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var routes = (
	<Route path="/" component={ App }>
	</Route>
);

httpService.fetchChirps();

ReactDOM.render( <Router history={ ReactRouter.browserHistory } >{ routes }</Router>, 
	document.getElementById('app'));
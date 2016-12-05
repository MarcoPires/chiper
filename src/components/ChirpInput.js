/**
 * npm modules
 */
var React = require('react');




var ReactPropTypes = React.PropTypes;

var ChirpInput = React.createClass({
	
	propTypes: {
		onSave: ReactPropTypes.func.isRequired
	},

	getInitialState() {
		return {
			value: ''
		};
	},

	handleChange: function(evt){
		this.setState({
			value: evt.target.value
		});
	},

	handleClick: function(evt){
		this.props.onSave(this.state.value);
		this.setState({
			value: ''
		});
	},

	render: function(){
		return (
			<div className='row'>
				
				<div className='nine columns'>
					<input 
						className   = 'u-full-width'
						type        = 'text'
						placeholder = 'Say Something!'
						value 		= { this.state.value }
						onChange 	= { this.handleChange }
					/>
				</div>

				<div className='three columns'>
					<button className='u-full-width button-primary' onClick={ this.handleClick }>
						Chirp
					</button>
				</div>
			</div>
		);
	}
});

module.exports = ChirpInput;
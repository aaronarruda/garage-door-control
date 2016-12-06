"use strict";
var React = require('react');
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Form = require('react-bootstrap').Form;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var FormGroup = require('react-bootstrap').FormGroup;
var Modal = require('react-bootstrap').Modal;
var ReactBootstrapSlider = require("react-bootstrap-slider").default;

var SettingsModal = React.createClass({

	getInitialState: function() {
		let debug = 1;
		if (this.props.debugInfo) {
			debug = 2;
		}

		return ({
			refreshRate: this.props.refreshRate / 1000,
			debugInfo: debug
		});
	},

	onRefreshRateChange: function(slider) {
		var value = slider.target.value;
		this.setState({refreshRate: value})
	},

	onDebugInfoChange: function(slider) {
		var value = slider.target.value;
		this.setState({debugInfo: value});
	},

	onSettingsSave: function() {
		let debug = this.state.debugInfo === 2;
		this.props.onSettingsSave({
			refreshRate: this.state.refreshRate * 1000,
			debugInfo: debug});
		this.props.onClose();
	},

	render: function() {
		return (
			<Modal show={this.props.visible} onHide={this.props.onClose} container={this.refs.parentContainer} 
				bsSize="small">
				<Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                	<ListGroup>
    					<ListGroupItem header="Refresh Rate">
    						Adjusts the refresh rate of the picture preview (in seconds).<br /><br />
    						<ReactBootstrapSlider value={this.state.refreshRate} step={1} min={1} max={10} 
				                	ticks = {[1, 2, 3, 5, 10]} 
				                	ticks_labels = {["1", "2", "3", "5", "10"]}
				                	ticks_positions = {[0, 25, 50, 75, 100]}
				                	ticks_snap_bounds = {10}
				                	ticks_tooltip = {false}
				                	change={this.onRefreshRateChange} />
    					</ListGroupItem>
    					<ListGroupItem header="Debug">
    						Display debug information.<br /><br />
    						<ReactBootstrapSlider value={this.state.debugInfo} step={1} min={1} max={2} 
				                	ticks = {[1, 2]} 
				                	ticks_labels = {["Off", "On",]}
				                	ticks_positions = {[0, 100]}
				                	ticks_snap_bounds = {100}
				                	ticks_tooltip = {"false"}
				                	change={this.onDebugInfoChange} />
				        </ListGroupItem>
    				</ListGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.onSettingsSave}>Save</Button>
                </Modal.Footer>
			</Modal>
			);
	}

});

module.exports = SettingsModal;
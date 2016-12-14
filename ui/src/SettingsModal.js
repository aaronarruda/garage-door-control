import React, { Component } from 'react';
import './App.css';

import {Button} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import {ListGroupItem} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {ReactBootstrapSlider} from 'react-bootstrap-slider';

class SettingsModal extends Component {
	constructor(props) {
		super(props);

		let debug = 1;
		if (this.props.debugInfo) {
			debug = 2
		}

		this.state = {
			refreshRate: this.props.refreshRate / 1000,
			debugInfo: debug
		};

		this.onRefreshRateChange = this.onRefreshRateChange.bind(this);
		this.onDebugInfoChange = this.onDebugInfoChange.bind(this);
		this.onSettingsSave = this.onSettingsSave.bind(this);
	}

	onRefreshRateChange(slider) {
		let value = slider.target.value;
		this.setState({refreshRate: value})
	}

	onDebugInfoChange(slider) {
		var value = slider.target.value;
		this.setState({debugInfo: value});
	}

	onSettingsSave() {
		let debug = this.state.debugInfo === 2;
		this.props.onSettingsSave({
			refreshRate: this.state.refreshRate * 1000,
			debugInfo: debug});
		this.props.onClose();
	}

	render() {
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
				                	ticks={[1, 2, 3, 5, 10]} 
				                	ticks_labels={["1", "2", "3", "5", "10"]}
				                	ticks_positions={[0, 25, 50, 75, 100]}
				                	ticks_snap_bounds={10}
				                	ticks_tooltip={false}
				                	change={this.onRefreshRateChange} />
    					</ListGroupItem>
    					<ListGroupItem header="Debug">
    						Display debug information.<br /><br />
    						<ReactBootstrapSlider value={this.state.debugInfo} step={1} min={1} max={2} 
				                	ticks={[1, 2]} 
				                	ticks_labels={["Off", "On",]}
				                	ticks_positions={[0, 100]}
				                	ticks_snap_bounds={100}
				                	ticks_tooltip={"false"}
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
}

export default SettingsModal
import React, { Component } from 'react';
import './App.css';

import $ from 'jquery';
import {Alert} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import {Grid} from 'react-bootstrap';
import {Image} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import SettingsModal from './SettingsModal';
import './config/globalConfigs';

// https://icons8.com/web-app/20157/garage-open
const garageOpenData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAB7klEQVRoQ+2a600DMRCEJxVAB9ABUAFQAXQAHVALHUAH0AFUAFQAJUAFoDnZaOPcWuu7tSxFayk/Ivn25pt9xJdkgz1Zmz3hQE+QUwA3AK6TWU8AHgG89zDPG+QqCaf4Q0XwNwBC8fXsBbUWhGLPFfEfAF4APCSxtwAuAJwI8RLqFQDfL1pLQCheOi9vTPEUTre/FEXHCZxgEorbZaaaoKwgvDnF09Fc81kny4PO18RrLmcoxmV8uRiPcRlfM+V/fw0ki6dzbFy5GDy71+RcpW6YaZrEVwnFAcFMq1AlSJ40dEiK/xHC6ZKXeI2LUDn7BDsQGwlFDVsTUIK8VcTT/ZErZ2oO6ozCJMhvUnqf0thl3ju4wUphud+lWBPDHIh1ADhoWhUiGx8gq2x0vDgy4mimS6jmjJRj2UVFYxB+blwW1zSD5Asa7+2+vZymi0FGjeUtwcKeAGnJyCcAHjrnFk8M07HCuIZmhMfuI0Uon1nK03SNaSiI0WzTtgDRxpzJvo6b3MZvR42m0G4gLVPLpMy4KXqkmkKji57bIiOREc960g6HcWgEoDVbpwTshI1mj2bvVGtRWlFaUVp1B6JHokeiR6JHJgfUX6w0f0Y/s1d1SXH86p5/x5hb/H27/KNAp5bYCWvSNcpldxP2BuQPIvjDM0oi1I8AAAAASUVORK5CYII=";
//https://icons8.com/web-app/20156/garage-closed
const garageClosedData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAB10lEQVRoQ+2a0U3EMBBE5yqADqADoALoAKgAOqAWOoAOoAOoAKgASoAKDr3IRnsmjhzHUSBaS/dxkr2ZNzu3H+dstJK1WQmH5gQ5lnQl6SKY9SDpXtLrHOa1BjkPwhG/nxH8KQkoPo+toKaCIPY0I/5N0pOkuyD2WtKZpCMj3kI9S+J71aoBQbx13j4Y8QjH7Y+MosMADpiFYrvt1CioUhAejngcjZmPOokHzg+Jz7kcoahLfbuoR13q50z52T8EEsXjHD9cuyge3Rvl3EBu6DQm8UmhGBB0OguVgsRJg0NW/JcRjkutxOe4gIrdB2zPbAQKDTsT0IK8DIjH/SVX7FQf1AnCLMg2KL0NbZxl3jdwg6QQ95tQq2PoAykdAA00TSoRjXeQSTY2POwdaWhmk1KjO5KO5SYqRhZh/F8mZ0aDxAMjn918ezpNq0GWGss7go09DuIdmfhr8WgNToeJ7tYc9454R2pyU3DGo+XRKohJzRaPlkerJjcFZzxaHq2CmNRs8Wh5tGpyU3DGo+XRKohJzZZFo/Uuiau7vsW9S3c5U7gWBeHy8iAjlJvf9E5yiGlRkEKzi7Y5SJFNf2jTr6s3rnx5HeM/Le7duxcYlvo/t7lZqwH5BmPFwjM4vQU4AAAAAElFTkSuQmCC";

let imageSrcUrl = ""; // Live preview requires the nginx configuration outlined in the setup.sh file.
if (window.globalConfigs.server) {
  imageSrcUrl = "http://" + window.globalConfigs.server;
}
imageSrcUrl += "/preview";

let apiUrl = "";
if (window.globalConfigs.server && window.globalConfigs.apiPort) {
  apiUrl = "http://" + window.globalConfigs.server + ":" + window.globalConfigs.apiPort;
}
apiUrl += "/garage-door-control/api/v1/";

class App extends Component {

  constructor() {
    super();

    this.state = {
      refreshRate: 5000,
      debugInfo: false,
      settingsModalVisible: false,
      statusData: {},
      closed: false,
      opened: false,
      key: 1, 
      url: imageSrcUrl,
      alertApiStatusError: false,
      alertApiToggleError: false,
      alertSensorMalfunction: false
    };

    this.refreshPicture = this.refreshPicture.bind(this);
    this.loadStatus = this.loadStatus.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
    this.onSettingsSave = this.onSettingsSave.bind(this);

  }

  componentDidMount() {
    var pictureIntervalId = setInterval(this.refreshPicture, this.state.refreshRate);
    setInterval(this.loadStatus, 2000);
    this.setState({pictureIntervalId: pictureIntervalId});
  }

  refreshPicture() {
    this.setState({key: Math.random(), url: imageSrcUrl + "?key=" + this.state.key});
  }

  loadStatus() {
    $.ajax({
      url: apiUrl + "status",
      cache: false,
      timeout: 5000,
      success: function(data) {

        var fullyClosed = false;
        var fullyOpen = false;

        // CLOSED means the reed switch is being actuated (the actuator is close to the sensor)
        if (data.closedSwitchStatus === "CLOSED") {
          fullyClosed = true;
        }
        if (data.openedSwitchStatus === "CLOSED") {
          fullyOpen = true;
        }

        var sensorMalfunction = false;
        if ((fullyOpen && fullyClosed)) {
          sensorMalfunction = true;
        } else {
          sensorMalfunction = false;
        }

        this.setState({
          statusData: data,
          closed: fullyClosed,
          opened: fullyOpen,
          alertSensorMalfunction: sensorMalfunction,
          alertApiStatusError: false
        });

      }.bind(this),
      error: function(jqxhr, testStatus, errorThrown) {
        this.setState({alertApiStatusError: true});
      }.bind(this)
    });
  }

  toggle() {
    $.ajax({
      url: apiUrl + "toggle",
      type: 'POST',
      timeout: 5000,
      success: function(data) {
        this.setState({alertApiToggleError: false});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({alertApiToggleError: true});
      }.bind(this)
    });
  }

  isAlertVisible() {
    return (this.state.alertSensorMalfunction || this.state.alertApiStatusError || this.state.alertApiToggleError);
  }

  renderAlert() {
    var self = this;

    var renderSensorMalfunctionAlert = function() {
      if (self.state.alertSensorMalfunction) {
        return (<li>Garage door sensor malfunction.  Both states have been detected.</li>);
      }
    };

    var renderApiStatusAlert = function() {
      if (self.state.alertApiStatusError) {
        return (<li>Cannot communicate with control device.</li>);
      }
    };

    var renderApiToggleAlert = function() {
      if (self.state.alertApiToggleError) {
        return (<li>Cannot toggle garage remote transmission.</li>);
      }
    };

    if (this.isAlertVisible()) {
      return (
        <Alert bsStyle="danger">
          <h4>There's a problem!</h4>
          <br />
          <ul>
          {renderSensorMalfunctionAlert()}
          {renderApiStatusAlert()}
          {renderApiToggleAlert()}
          </ul>
          <br />
          <p>You can still attempt to toggle the garage door, though it isn't guaranteed to work.</p>
        </Alert>
        );
    }
  }

  renderButton() {
    if (this.state.closed && !this.state.opened) {
      return (
        <Button bsStyle="success" bsSize="large" onClick={this.toggle} block>
          <Image src={garageClosedData} width="50" height="50" />
        </Button>
        );
    } else if (this.state.opened && !this.state.closed) {
      return (
        <Button bsStyle="danger" bsSize="large" onClick={this.toggle} block>
          <Image src={garageOpenData} width="50" height="50" />
        </Button>
        );
    } else {
      return (
        <Button bsStyle="warning" bsSize="large" onClick={this.toggle} block>
          <Image src={garageOpenData} width="50" height="50" />
        </Button>
        );
    }
  }

  renderDescription() {
    if (this.state.state === "CLOSED") {
      return "Press button to open garage";
    } else if (this.state.state === "OPEN") {
      return "Press button to close garage";
    } else {
      return "";
    }
  }

  toggleSettingsModal() {
    var newState = !this.state.settingsModalVisible;
    this.setState({settingsModalVisible: newState});
  }

  updatePictureRefreshRate(refreshRate) {
    clearInterval(this.state.pictureIntervalId);
    var pictureIntervalId = setInterval(this.refreshPicture, refreshRate);
    this.setState({refreshRate: refreshRate, pictureIntervalId: pictureIntervalId});
  }

  onSettingsSave(object) {
    var refreshRate = object.refreshRate;
    this.updatePictureRefreshRate(refreshRate);

    var debugInfo = object.debugInfo;
    this.setState({debugInfo: debugInfo});
  }

  renderDebugInfo() {
    if (this.state.debugInfo) {
      return (
        <div>
          <h2><small>Debug Info</small></h2>
          Refresh Rate: {this.state.refreshRate} (ms)<br />
          Chip Temp: {this.state.statusData.chipTemp}<br />
          Load Average: {this.state.statusData.load}
        </div>
        );
    }
  }

  render() {
    return (
      <div className="container-fluid" ref="parentContainer">
        <SettingsModal visible={this.state.settingsModalVisible} onClose={this.toggleSettingsModal} 
          refreshRate={this.state.refreshRate} debugInfo={this.state.debugInfo} onSettingsSave={this.onSettingsSave} />
        <div className="row">
          <div className="col-sm-4">
            <PageHeader>Garage Door Control</PageHeader>
            {this.renderAlert()}
            <Grid>
              <Row>
                <Image src={this.state.url} responsive/>
              </Row>
              <Row>
                {this.renderButton()}
              </Row>
              <Row>
                {this.renderDescription()}
              </Row>
              <Row>&nbsp;</Row>
              <Row>
                <Col>{this.renderDebugInfo()}</Col>
                <Col xsOffset={11}>
                  <Button onClick={this.toggleSettingsModal}><Glyphicon glyph="cog" /></Button>
                </Col>
              </Row>
            </Grid>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;

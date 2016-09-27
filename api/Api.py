import sys, os
import configparser
from flask import Flask, jsonify, request, current_app
from ApiUtils import crossdomain
from GPIOUtils import GPIOUtils
from PeriodicTasks import PeriodicReedSwitchRead
from threading import Thread
import time

app = Flask(__name__)

config = configparser.ConfigParser()
config.read('properties.ini')

util = GPIOUtils(config)
util.init()

switchRead = PeriodicReedSwitchRead(float(config['general']['REED_SWITCH_PIN_CHECK_INTERVAL']), util)
print "switch: " + str(switchRead.getSwitchState())
switchRead.start()


@app.route('/garage-door-control/api/v1/status', methods=['GET'])
@crossdomain(origin='*')
def status():
	try:
		return jsonify(switchRead.getSwitchState())
	except TypeError as e:
		print str(e)

@app.route('/garage-door-control/api/v1/toggle', methods=['POST'])
@crossdomain(origin='*')
def toggle():
	toggleThread = Thread(target = util.toggleGarageRemote)
	toggleThread.start()
	return jsonify("TOGGLED")

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=10101, debug=True)
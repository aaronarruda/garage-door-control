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

@app.route('/garage-door-control/api/v1/status', methods=['GET'])
@crossdomain(origin='*')
def status():
	try:
		closedSwitchStatus, openedSwitchStatus = util.getSwitchState()
		return jsonify(closedSwitchStatus=closedSwitchStatus, openedSwitchStatus=openedSwitchStatus)
	except TypeError as e:
		print str(e)

@app.route('/garage-door-control/api/v1/toggle', methods=['POST'])
@crossdomain(origin='*')
def toggle():
	toggleThread = Thread(target = util.toggleGarageRemote)
	toggleThread.start()
	return jsonify("TOGGLED")

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=10111, debug=True)
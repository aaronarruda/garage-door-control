import sys, os
import configparser
from flask import Flask, jsonify, request, current_app
from ApiUtils import crossdomain
from GPIOUtils import GPIOUtils
from PeriodicTasks import PeriodicReedSwitchRead

app = Flask(__name__)

config = configparser.ConfigParser()
config.read('properties.ini')

util = GPIOUtils(config)
util.init()

PeriodicReedSwitchRead(10, util).start()


@app.route('/garage-door-control/api/v1/status', methods=['GET'])
@crossdomain(origin='*')
def status():
	try:
		print "status"
	except TypeError as e:
		print str(e)

@app.route('/garage-door-control/api/v1/toggle', methods=['POST'])
@crossdomain(origin='*')
def toggle():
	print "toggle"
	util.toggleGarageRemote()

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=11111, debug=True)
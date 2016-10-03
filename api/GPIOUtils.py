import RPi.GPIO as GPIO
import time

class GPIOUtils():
	def __init__(self, config):
		self.config = config
		self.remotePin = int(config['pins']['REMOTE_PIN'])
		self.transmissionLength = int(config['general']['REMOTE_TRANSMISSION_DURATION'])
		self.closedReedSwitchPin = int(config['pins']['CLOSED_REED_SWITCH_PIN'])
		self.openedReedSwitchPin = int(config['pins']['OPENED_REED_SWITCH_PIN'])
		self.closedReedSwitchStatus = ""
		self.openedReedSwitchStatus = ""

	def init(self):
		# general GPIO output/input settings
		GPIO.setwarnings(True)
		GPIO.setmode(GPIO.BOARD)
		GPIO.setup(self.remotePin, GPIO.OUT)
		GPIO.output(self.remotePin, GPIO.HIGH) # Make sure relay is off when we start up
		GPIO.setup(self.closedReedSwitchPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
		GPIO.setup(self.openedReedSwitchPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
		# set current state of switches
		self.setClosedReedSwitchStatus(self.closedReedSwitchPin)
		self.setOpenedReedSwitchStatus(self.openedReedSwitchPin)
		# configure callbacks for updating switch status
		GPIO.add_event_detect(self.closedReedSwitchPin, GPIO.BOTH, callback=self.setClosedReedSwitchStatus)
		GPIO.add_event_detect(self.openedReedSwitchPin, GPIO.BOTH, callback=self.setOpenedReedSwitchStatus)

	def toggleGarageRemote(self):
		GPIO.output(self.remotePin, GPIO.LOW)
		time.sleep(self.transmissionLength)
		GPIO.output(self.remotePin, GPIO.HIGH)

	def getStatusOfSwitch(self, channel):
		if (GPIO.input(channel) == GPIO.LOW):
			return "CLOSED"
		else:
			return "OPEN"

	def setClosedReedSwitchStatus(self, channel):
		self.closedReedSwitchStatus = self.getStatusOfSwitch(channel)

	def setOpenedReedSwitchStatus(self, channel):
		self.openedReedSwitchStatus = self.getStatusOfSwitch(channel)

	def getSwitchState(self):
		return (self.closedReedSwitchStatus, self.openedReedSwitchStatus)

	def readOpenCloseSwitchPins(self):
		print "reading pins..."
		closedSwitchVal = GPIO.input(self.closedReedSwitchPin)
		openedSwitchVal = GPIO.input(self.openedReedSwitchPin)
		return (closedSwitchVal, openedSwitchVal)

	
	
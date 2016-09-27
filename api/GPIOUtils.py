import RPi.GPIO as GPIO
import time

class GPIOUtils():
	def __init__(self, config):
		self.config = config
		self.remotePin = int(config['pins']['REMOTE_PIN'])
		self.transmissionLength = int(config['general']['REMOTE_TRANSMISSION_DURATION'])
		self.closedReedSwitchPin = int(config['pins']['CLOSED_REED_SWITCH_PIN'])
		self.openedReedSwitchPin = int(config['pins']['OPENED_REED_SWITCH_PIN'])

	def init(self):
		GPIO.setwarnings(True)
		GPIO.setmode(GPIO.BOARD)
		GPIO.setup(self.remotePin, GPIO.OUT)
		GPIO.setup(self.closedReedSwitchPin, GPIO.IN)
		GPIO.setup(self.openedReedSwitchPin, GPIO.IN)

	def readOpenCloseSwitchPins(self):
		print "reading pins..."
		closedSwitchVal = GPIO.input(self.closedReedSwitchPin)
		openedSwitchVal = GPIO.input(self.openedReedSwitchPin)
		return (closedSwitchVal, openedSwitchVal)

	def toggleGarageRemote(self):
		GPIO.output(self.remotePin, GPIO.LOW)
		time.sleep(self.transmissionLength)
		GPIO.output(self.remotePin, GPIO.HIGH)
	
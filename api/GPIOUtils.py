import RPi.GPIO as GPIO
import time

class GPIOUtils():
	def __init__(self, config):
		self.config = config
		self.remotePin = int(config['pins']['RemotePin'])
		self.closedReedSwitchPin = int(config['pins']['ClosedReedSwitchPin'])
		self.openedReedSwitchPin = int(config['pins']['OpenedReedSwitchPin'])

	def init(self):
		GPIO.setwarnings(False)
		GPIO.setmode(GPIO.BOARD)
		GPIO.setup(self.remotePin, GPIO.OUT)

	def readOpenCloseSwitchPins(self):
		print "reading pins..."

	def toggleGarageRemote(self):
		GPIO.output(self.remotePin, GPIO.LOW)
		time.sleep(2)
		GPIO.output(self.remotePin, GPIO.HIGH)
	
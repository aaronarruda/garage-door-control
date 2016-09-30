import threading

class PeriodicReedSwitchRead(threading.Thread):

	def __init__(self, interval, gpioUtil):
		super(PeriodicReedSwitchRead, self).__init__()
		self.interval = interval
		self.daemon = True
		self.gpioUtil = gpioUtil
		self.openedSwitchState = 0
		self.closedSwitchState = 0
		
	def run(self):
		self.openedSwitchState, self.closedSwitchState = self.gpioUtil.readOpenCloseSwitchPins()
		threading.Timer(self.interval, self.run).start()

	def getSwitchState(self):
		return (self.openedSwitchState, self.closedSwitchState)

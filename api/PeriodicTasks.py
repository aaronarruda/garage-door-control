import threading

class PeriodicReedSwitchRead(threading.Thread):

	def __init__(self, interval, gpioUtil):
		super(PeriodicReedSwitchRead, self).__init__()
		self.interval = interval
		self.daemon = True
		self.gpioUtil = gpioUtil
		

	def run(self):
		self.gpioUtil.readOpenCloseSwitchPins()
		threading.Timer(self.interval, self.run).start()

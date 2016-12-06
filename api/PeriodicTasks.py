import threading
import subprocess
from subprocess import CalledProcessError

class PeriodicDebugInfoRead(threading.Thread):

	def __init__(self, interval):
		super(PeriodicDebugInfoRead, self).__init__()
		self.interval = interval
		self.daemon = True
		self.temp = "";
		self.load = "";

	def run(self):
		try:
			self.temp = subprocess.check_output("/opt/vc/bin/vcgencmd measure_temp", shell=True)
			# strip temp= from above string
			self.temp = self.temp.replace("temp=", "").rstrip()

			self.load = subprocess.check_output("uptime | awk '{print $10, $11, $12}'", shell=True).rstrip()
		except CalledProcessError as e:
			self.temp = "ERROR"
		threading.Timer(self.interval, self.run).start()

	def getTemp(self):
		return self.temp

	def getLoad(self):
		return self.load

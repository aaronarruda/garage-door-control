import threading
import subprocess
from subprocess import CalledProcessError

class PeriodicChipTempRead(threading.Thread):

	def __init__(self, interval):
		super(PeriodicChipTempRead, self).__init__()
		self.interval = interval
		self.daemon = True
		self.temp = 0;

	def run(self):
		try:
			self.temp = subprocess.check_output("/opt/vc/bin/vcgencmd measure_temp", shell=True)
			self.temp = self.temp.replace("temp=", "").rstrip()
			# trip temp= from above string
		except CalledProcessError as e:
			self.temp = "ERROR"
		threading.Timer(self.interval, self.run).start()

	def getTemp(self):
		return self.temp

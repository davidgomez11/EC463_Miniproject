import random
import time
import threading
import pyrebase
import firebase_admin
from firebase_admin import credentials

firebaseConfig = {
  "x"
}

firebase = pyrebase.initialize_app(firebaseConfig)

cred = credentials.Certificate("x")
firebase_admin.initialize_app(cred)

db = firebase.database()

def createSensorVal():
	while True:
		print random.randint(60,90)
		print "\n"

def injectNewVals():
	while True:
		all_users = db.child("chart").get()
		for user in all_users.each():
			print(user.key()) 
			print(user.val()) 
			db.child("chart/" + user.key()).update({"0" : random.randint(60,90),
				"1" : random.randint(60,90),
				"2" : random.randint(60,90),
				"3" : random.randint(60,90),
				"4" : random.randint(60,90),
				"5" : random.randint(60,90),
				"6" : random.randint(60,90),
				"7" : random.randint(60,90),
				"8" : random.randint(60,90),
				"9" : random.randint(60,90),
				"10" : random.randint(60,90)})
		time.sleep(5)	

threado = threading.Thread(target=injectNewVals)
threado.setDaemon(True)
threado.start()
while True:
	pass



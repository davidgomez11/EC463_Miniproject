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
			db.child("chart/" + user.key()).update({"0" : [random.randint(70,85), random.randint(40,50)],
				"1" : [random.randint(70,85), random.randint(40,50)],
				"2" : [random.randint(70,85), random.randint(40,50)],
				"3" : [random.randint(70,85), random.randint(40,50)],
				"4" : [random.randint(70,85), random.randint(40,50)],
				"5" : [random.randint(70,85), random.randint(40,50)],
				"6" : [random.randint(70,85), random.randint(40,50)],
				"7" : [random.randint(70,85), random.randint(40,50)],
				"8" : [random.randint(70,85), random.randint(40,50)],
				"9" : [random.randint(70,85), random.randint(40,50)],
				"10" : [random.randint(70,85), random.randint(40,50)]})
		time.sleep(5)	

def slowInjection():
	while True:
		all_users = db.child("chart").get()
		for user in all_users.each():
			print(user.key()) 
			print(user.val()) 
			x = 0
			while x < 10:
				db.child("chart/" + user.key()).update({str(x) : random.randint(70,85)})
				time.sleep(1)
				x += 1


threado = threading.Thread(target=injectNewVals)
threado.setDaemon(True)
threado.start()
while True:
	pass



import RPi.GPIO as GPIO
import time
import subprocess

GPIO.setmode(GPIO.BCM)
PIR_PIN = 26
GPIO.setup(PIR_PIN, GPIO.IN)

try:
    print "PIR Module Test (CTRL+C to exit)"
    time.sleep(2)
    print "Ready"
    while True:
        if GPIO.input(PIR_PIN):
            print "Motion Detected!"
            subprocess.check_call(['node', '../noice-patterns/index.js'])
        time.sleep(1)
except KeyboardInterrupt:
    print " Quit"
    GPIO.cleanup()

'''
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

PIR_IN = 2
N = 14
O = 15
I = 18
C = 23
E = 24

GPIO.setup(PIR_IN, GPIO.IN)
GPIO.setup(N, GPIO.OUT)
GPIO.setup(O, GPIO.OUT)
GPIO.setup(I, GPIO.OUT)
GPIO.setup(C, GPIO.OUT)
GPIO.setup(E, GPIO.OUT)

try:
    while True:
        i = GPIO.input(PIR_IN)
        if GPIO.input(PIR_IN):
            print 'zero'
            GPIO.output(N, GPIO.HIGH)
        else:
            print 'one'
            GPIO.output(N, GPIO.LOW)

        time.sleep(.5)
except KeyboardInterrupt:
        print 'cancelled'
        GPIO.cleanup()
'''

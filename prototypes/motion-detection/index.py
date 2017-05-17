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
        if i == 0:
            print 'on'
            GPIO.output(N, GPIO.HIGH)
        elif i == 1:
            print 'off'
            GPIO.output(N, GPIO.LOW)
        else:
            print '?!'
        time.sleep(.5)
except keyboardInturupt:
        print 'cancelled'

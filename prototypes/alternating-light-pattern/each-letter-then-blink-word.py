import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

leds = {
        'RED': 14,
        'BLUE': 15,
        'WHITE': 18,
        'YELLOW': 23,
        'GREEN': 24
}

for color, pin in leds.iteritems():
    GPIO.setup(pin, GPIO.OUT)
    
'''
GPIO.setup(leds['RED'], GPIO.OUT)
GPIO.setup(leds['BLUE'], GPIO.OUT)
GPIO.setup(leds['WHITE'], GPIO.OUT)
GPIO.setup(leds['YELLOW'], GPIO.OUT)
GPIO.setup(leds['GREEN'], GPIO.OUT)
'''

# for i in range(0, 10):

for color, pin in leds.iteritems():
    print color
    GPIO.output(pin, GPIO.HIGH)
    time.sleep(.05)

for color, pin in leds.iteritems():
    print color
    GPIO.output(pin, GPIO.LOW)
    time.sleep(.05)

'''
print "Red"
GPIO.output(leds['RED'], GPIO.HIGH)
time.sleep(.05)

print "Blue"
GPIO.output(leds['BLUE'], GPIO.HIGH)
time.sleep(.05)

print "White"
GPIO.output(leds['WHITE'], GPIO.HIGH)
time.sleep(.05)

print "Yellow"
GPIO.output(leds['YELLOW'], GPIO.HIGH)
time.sleep(.05)

print "Green"
GPIO.output(leds['GREEN'], GPIO.HIGH)
'''

print ""
time.sleep(.5)

GPIO.output(14, GPIO.LOW)
GPIO.output(15, GPIO.LOW)
GPIO.output(18, GPIO.LOW)
GPIO.output(23, GPIO.LOW)
GPIO.output(24, GPIO.LOW)
time.sleep(.5)

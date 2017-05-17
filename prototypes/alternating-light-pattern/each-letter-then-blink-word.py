import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

leds = {
        ('RED', 14),
        ('BLUE', 15),
        ('WHITE', 18),
        ('YELLOW', 23),
        ('GREEN', 24)
}

for color, pin in leds.iteritems():
    GPIO.setup(pin, GPIO.OUT)

for color, pin in leds.iteritems():
    print color
    GPIO.output(pin, GPIO.HIGH)
    time.sleep(.5)

for color, pin in leds.iteritems():
    print color
    GPIO.output(pin, GPIO.LOW)
    time.sleep(.05)


print ""
time.sleep(.5)

for color, pin in leds.iteritems():
    GPIO.output(pin, GPIO.LOW)

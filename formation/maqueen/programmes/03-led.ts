maqueen.motorStop(maqueen.Motors.All)
input.onButtonPressed(Button.A, function () {
maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
basic.pause(500)
maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
basic.pause(500)
maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
})

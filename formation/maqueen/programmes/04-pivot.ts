maqueen.motorStop(maqueen.Motors.All)
input.onButtonPressed(Button.A, function () {
maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 80)
maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 80)
basic.pause(400)
maqueen.motorStop(maqueen.Motors.All)
})

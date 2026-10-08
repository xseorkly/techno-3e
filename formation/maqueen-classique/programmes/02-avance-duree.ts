maqueen.motorStop(maqueen.Motors.All)
input.onButtonPressed(Button.A, function () {
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
basic.pause(1000)
maqueen.motorStop(maqueen.Motors.All)
})

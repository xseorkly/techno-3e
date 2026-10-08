maqueen.motorStop(maqueen.Motors.All)
input.onButtonPressed(Button.A, function () {
for (let index = 0; index < 4; index++) {
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
basic.pause(1000)
maqueen.motorStop(maqueen.Motors.All)
basic.pause(200)
maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 80)
maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 80)
basic.pause(400)
maqueen.motorStop(maqueen.Motors.All)
basic.pause(200)
}
})

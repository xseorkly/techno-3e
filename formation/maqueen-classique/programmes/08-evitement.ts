maqueen.motorStop(maqueen.Motors.All)
input.onButtonPressed(Button.A, function () {
let distance = maqueen.Ultrasonic()
if (distance > 0 && distance < 500 && distance <= 20) {
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 60)
basic.pause(300)
maqueen.motorStop(maqueen.Motors.All)
maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 60)
basic.pause(400)
maqueen.motorStop(maqueen.Motors.All)
} else {
maqueen.motorStop(maqueen.Motors.All)
}
})

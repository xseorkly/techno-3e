maqueen.motorStop(maqueen.Motors.All)
let actif = false
let distance = 0
input.onButtonPressed(Button.A, function () {
actif = true
})
input.onButtonPressed(Button.B, function () {
actif = false
maqueen.motorStop(maqueen.Motors.All)
})
basic.forever(function () {
if (actif) {
distance = maqueen.Ultrasonic()
if (distance <= 0 || distance >= 500 || distance <= 20) {
maqueen.motorStop(maqueen.Motors.All)
actif = false
} else {
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
}
}
basic.pause(50)
})

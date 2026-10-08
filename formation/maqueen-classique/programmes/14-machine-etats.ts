maqueen.motorStop(maqueen.Motors.All)
let actif = false
let etat = 0
let debut = 0
let distance = 0
input.onButtonPressed(Button.A, function () {
etat = 0
actif = true
})
input.onButtonPressed(Button.B, function () {
actif = false
maqueen.motorStop(maqueen.Motors.All)
})
basic.forever(function () {
if (actif) {
if (etat == 0) {
distance = maqueen.Ultrasonic()
if (distance <= 0 || distance >= 500) {
actif = false
maqueen.motorStop(maqueen.Motors.All)
} else if (distance <= 20) {
etat = 1
debut = input.runningTime()
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 60)
} else {
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 60)
}
} else if (etat == 1) {
if (input.runningTime() - debut >= 300) {
etat = 2
debut = input.runningTime()
maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 60)
}
} else if (input.runningTime() - debut >= 400) {
maqueen.motorStop(maqueen.Motors.All)
etat = 0
}
}
basic.pause(20)
})

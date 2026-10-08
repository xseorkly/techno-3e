maqueen.motorStop(maqueen.Motors.All)
let marche = false
let distance = 0
basic.forever(function () {
distance = maqueen.Ultrasonic()
if (distance <= 0 || distance >= 500) {
marche = false
} else if (distance <= 15) {
marche = false
} else if (distance >= 25) {
marche = true
}
if (marche) {
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
} else {
maqueen.motorStop(maqueen.Motors.All)
}
basic.pause(50)
})

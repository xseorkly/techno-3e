maqueen.motorStop(maqueen.Motors.All)
let actif = false
let gauche = 0
let droite = 0
let distance = 0
let debutBlanc = 0
input.onButtonPressed(Button.A, function () {
actif = true
debutBlanc = 0
})
input.onButtonPressed(Button.B, function () {
actif = false
maqueen.motorStop(maqueen.Motors.All)
})
basic.forever(function () {
if (actif) {
distance = maqueen.Ultrasonic()
gauche = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
droite = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
if (distance <= 0 || distance >= 500 || distance <= 20) {
maqueen.motorStop(maqueen.Motors.All)
actif = false
} else if (gauche == 1 && droite == 1) {
maqueen.motorStop(maqueen.Motors.All)
if (debutBlanc == 0) {
debutBlanc = input.runningTime()
}
if (input.runningTime() - debutBlanc >= 500) {
actif = false
basic.showIcon(IconNames.Yes)
}
} else {
debutBlanc = 0
gauche = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
droite = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
if (gauche == 0 && droite == 0) {
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 60)
} else if (gauche == 0 && droite == 1) {
maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
} else if (gauche == 1 && droite == 0) {
maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
} else {
maqueen.motorStop(maqueen.Motors.All)
}
}
}
basic.pause(20)
})

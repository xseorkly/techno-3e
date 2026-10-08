maqueen.motorStop(maqueen.Motors.All)
let gauche = 0
let droite = 0
basic.forever(function () {
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
basic.pause(20)
})

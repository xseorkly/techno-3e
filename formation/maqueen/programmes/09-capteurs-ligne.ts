maqueen.motorStop(maqueen.Motors.All)
let gauche = 0
let droite = 0
basic.forever(function () {
gauche = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
droite = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
serial.writeValue("gauche", gauche)
serial.writeValue("droite", droite)
basic.showNumber(2 * gauche + droite)
basic.pause(200)
})

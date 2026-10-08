maqueen.motorStop(maqueen.Motors.All)
let coteMs = 1000
let virageMs = 400
let nombreCotes = 4
function avancer() {
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
basic.pause(coteMs)
maqueen.motorStop(maqueen.Motors.All)
}
function tournerDroite() {
maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 80)
maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 80)
basic.pause(virageMs)
maqueen.motorStop(maqueen.Motors.All)
}
input.onButtonPressed(Button.A, function () {
for (let index = 0; index < nombreCotes; index++) {
avancer()
basic.pause(200)
tournerDroite()
basic.pause(200)
}
})

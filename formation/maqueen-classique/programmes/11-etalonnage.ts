maqueen.motorStop(maqueen.Motors.All)
let duree = 1000
let vitesse = 80
input.onButtonPressed(Button.A, function () {
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, vitesse)
basic.pause(duree)
maqueen.motorStop(maqueen.Motors.All)
})
input.onButtonPressed(Button.B, function () {
duree += 100
basic.showNumber(duree)
})

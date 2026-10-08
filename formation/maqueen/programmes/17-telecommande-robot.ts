// Micro:bit n°2 = robot Maqueen (reçoit les ordres)
// Extension à ajouter dans MakeCode : maqueen (https://github.com/DFRobot/pxt-maqueen), catégorie Maqueen v4
let dernier = 0
radio.setGroup(1)
maqueen.motorStop(maqueen.Motors.All)
radio.onReceivedString(function (receivedString) {
    dernier = input.runningTime()
    if (receivedString == "F") {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 60)
    } else if (receivedString == "L") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    } else if (receivedString == "R") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
})
basic.forever(function () {
    // Sécurité : si plus aucun ordre depuis 0,5 s, le robot s'arrête
    if (input.runningTime() - dernier > 500) {
        maqueen.motorStop(maqueen.Motors.All)
    }
    basic.pause(50)
})

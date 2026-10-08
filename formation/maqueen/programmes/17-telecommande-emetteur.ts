// Micro:bit n°1 = télécommande (à tenir à la main)
// Extension à ajouter dans MakeCode : aucune (la radio est intégrée)
radio.setGroup(1)
basic.forever(function () {
    if (input.buttonIsPressed(Button.A) && input.buttonIsPressed(Button.B)) {
        radio.sendString("F")
    } else if (input.buttonIsPressed(Button.A)) {
        radio.sendString("L")
    } else if (input.buttonIsPressed(Button.B)) {
        radio.sendString("R")
    } else {
        radio.sendString("S")
    }
    basic.pause(100)
})

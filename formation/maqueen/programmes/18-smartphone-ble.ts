// Micro:bit du robot Maqueen, piloté en Bluetooth (smartphone ou ordinateur)
// Extensions à ajouter dans MakeCode : maqueen (DFRobot/pxt-maqueen) ET Bluetooth.
// Attention : Bluetooth et Radio ne peuvent pas être utilisés dans le même projet.
// Avec une carte micro:bit V1, la mémoire peut être insuffisante : préférer la V2.
let commande = ""
bluetooth.startUartService()
maqueen.motorStop(maqueen.Motors.All)
bluetooth.onBluetoothDisconnected(function () {
    maqueen.motorStop(maqueen.Motors.All)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    commande = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (commande == "F") {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 60)
    } else if (commande == "B") {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 60)
    } else if (commande == "L") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    } else if (commande == "R") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
})

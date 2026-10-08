maqueen.motorStop(maqueen.Motors.All)
let distance = 0
basic.forever(function () {
distance = maqueen.Ultrasonic()
basic.showNumber(distance)
basic.pause(200)
})

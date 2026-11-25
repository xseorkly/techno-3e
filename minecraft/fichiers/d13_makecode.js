player.onChat("livraison", function () {
    agent.setAssist(DESTROY_OBSTACLES, false)
    agent.setAssist(PLACE_ON_MOVE, false)
    agent.move(FORWARD, 4)
    agent.turn(RIGHT_TURN)
    agent.move(FORWARD, 3)
    agent.turn(RIGHT_TURN)
    agent.move(FORWARD, 4)
})

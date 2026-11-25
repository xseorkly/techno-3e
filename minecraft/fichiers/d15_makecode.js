player.onChat("labyrinthe", function () {
    agent.setAssist(DESTROY_OBSTACLES, false)
    agent.setAssist(PLACE_ON_MOVE, false)
    for (let i = 0; i < 20; i++) {
        if (agent.detect(AgentDetection.BLOCK, FORWARD)) {
            agent.turn(RIGHT_TURN)
        } else {
            agent.move(FORWARD, 1)
        }
    }
})

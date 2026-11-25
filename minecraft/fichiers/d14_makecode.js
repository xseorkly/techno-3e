player.onChat("cloture", function (n) {
    if (n >= 2 && n <= 12) {
        agent.setItem(OAK_FENCE, 4 * n + 1, 1)
        agent.setSlot(1)
        agent.setAssist(DESTROY_OBSTACLES, false)
        agent.setAssist(PLACE_ON_MOVE, true)
        for (let i = 0; i < 4; i++) {
            agent.turn(LEFT_TURN)
            agent.move(FORWARD, n)
        }
        agent.move(FORWARD, 1)
        agent.setAssist(PLACE_ON_MOVE, false)
    }
})

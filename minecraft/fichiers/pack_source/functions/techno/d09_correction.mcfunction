# Technologie collège - à exécuter seulement dans un monde de test vierge
fill ~ ~-1 ~ ~16 ~-1 ~16 minecraft:stone
setblock ~ ~-1 ~ minecraft:blue_concrete
fill ~3 ~-1 ~3 ~7 ~-1 ~7 minecraft:cobblestone
setblock ~3 ~ ~3 minecraft:lever["lever_direction"="up_north_south","open_bit"=false]
setblock ~3 ~ ~7 minecraft:lever["lever_direction"="up_north_south","open_bit"=false]
fill ~4 ~ ~3 ~5 ~ ~3 minecraft:redstone_wire
fill ~4 ~ ~7 ~5 ~ ~7 minecraft:redstone_wire
fill ~5 ~ ~4 ~5 ~ ~6 minecraft:redstone_wire
fill ~6 ~ ~5 ~7 ~ ~5 minecraft:redstone_wire
setblock ~8 ~ ~5 minecraft:redstone_lamp

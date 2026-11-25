# Technologie collège - à exécuter seulement dans un monde de test vierge
fill ~ ~-1 ~ ~16 ~-1 ~16 minecraft:stone
setblock ~ ~-1 ~ minecraft:blue_concrete
fill ~2 ~-1 ~5 ~13 ~-1 ~5 minecraft:cobblestone
setblock ~2 ~ ~5 minecraft:stone
setblock ~13 ~ ~5 minecraft:stone
fill ~3 ~ ~5 ~5 ~ ~5 minecraft:rail["rail_direction"=1]
fill ~6 ~ ~5 ~9 ~ ~5 minecraft:golden_rail["rail_direction"=1]
fill ~10 ~ ~5 ~12 ~ ~5 minecraft:rail["rail_direction"=1]
setblock ~7 ~ ~6 minecraft:lever["lever_direction"="up_north_south","open_bit"=false]

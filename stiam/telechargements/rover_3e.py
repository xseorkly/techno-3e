"""Simulation logique du rover : ne pilote pas directement un robot réel."""
from dataclasses import dataclass
@dataclass
class Rover:
    seuil_cm: float = 15.0
    def decider(self, distance_cm: float) -> str:
        if distance_cm < self.seuil_cm:
            return "ARRET_ET_CONTOURNEMENT"
        return "AVANCER"

if __name__ == "__main__":
    rover = Rover()
    for distance in [30, 18, 14, 9, 22]:
        print(distance, "cm →", rover.decider(distance))

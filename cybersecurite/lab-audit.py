#!/usr/bin/env python3
"""Analyse hors ligne du jeu Horizon. Python 3, bibliothèque standard.
Aucun réseau, aucun secret, aucune modification du SI.
Entrée : CSV fictifs uniquement. Sortie : rapport JSON sur stdout.
"""
import csv
import json
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parent

def read_csv(name):
    with (ROOT / name).open(encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f, delimiter=";"))

assets = read_csv("lab-actifs.csv")
controls = read_csv("lab-controles.csv")
ids = [a["asset_id"] for a in assets]
if len(ids) != len(set(ids)) or not all(ids):
    raise ValueError("Identifiants actifs dupliqués ou vides")
unknown_refs = sorted({c["asset_id"] for c in controls} - set(ids))
if unknown_refs:
    raise ValueError("Contrôles sans actif référencé : " + str(unknown_refs))
evidence = [c["evidence_id"] for c in controls]
if len(evidence) != len(set(evidence)) or not all(evidence):
    raise ValueError("Identifiants de preuve dupliqués ou vides")
if any(a["edr"] not in {"yes","no","unknown"} or a["patch_evidence"] not in {"fresh","stale","unknown"} for a in assets):
    raise ValueError("Statut actif invalide")
if any(c["status"] not in {"pass","fail","unknown"} for c in controls):
    raise ValueError("Statut contrôle invalide")
n = len(assets)
def coverage(field, positive):
    counts = Counter(a[field] for a in assets)
    return {"denominator":n,"counts":dict(counts),
            "positive_percent":round(100*counts[positive]/n,2) if n else None}
report = {
    "scope":"Horizon synthetic lab only",
    "assets":n,
    "edr":coverage("edr","yes"),
    "patch_evidence":coverage("patch_evidence","fresh"),
    "control_counts":dict(Counter(c["status"] for c in controls)),
    "findings":[{"asset":c["asset_id"],"control":c["control_id"],
                 "status":c["status"],"evidence":c["evidence_id"],
                 "observation":c["observation"]}
                for c in controls if c["status"]!="pass"]
}
print(json.dumps(report,ensure_ascii=True,indent=2))

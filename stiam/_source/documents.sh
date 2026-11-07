#!/bin/sh
# Régénère tous les documents téléchargeables (Word + PDF) à partir des fichiers contenu_*.py.
# Prérequis : Python 3 avec Pillow et pypdf, Node.js avec le paquet « docx », LibreOffice (soffice).
# Usage, depuis le dossier stiam : sh _source/documents.sh
set -e
cd "$(dirname "$0")/.."
python3 _source/telechargements.py
python3 _source/documents.py
NODE_PATH="${NODE_PATH:-$(npm root -g)}" node _source/documents.js
for d in telechargements/enseignants telechargements/eleves telechargements/atlas; do
  (cd "$d" && soffice --headless --convert-to pdf ./*_V4.docx > /dev/null)
done
python3 - <<'EOF'
from pypdf import PdfWriter
ordre = ["telechargements/enseignants/00_Cadrage_general_V4.pdf"]
for n in ["CM1", "CM2", "6e", "5e", "4e", "3e"]:
    ordre += ["telechargements/enseignants/%s_Dossier_enseignant_V4.pdf" % n, "telechargements/eleves/%s_Livret_eleve_V4.pdf" % n]
ordre.append("telechargements/atlas/Atlas_images_scientifiques_V4.pdf")
w = PdfWriter()
for f in ordre:
    w.append(f)
w.compress_identical_objects()
with open("telechargements/Parcours_Astronomie_V4_Integral.pdf", "wb") as out:
    w.write(out)
print("Parcours intégral :", len(w.pages), "pages")
EOF
rm -f telechargements/atlas/*.docx
rm -rf _source/_docs
python3 _source/build.py

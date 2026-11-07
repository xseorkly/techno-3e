"""Coder une image fictive de 8 × 8 pixels, sur 2 bits par pixel."""
classes = {"00":"eau", "01":"vegetation", "10":"ville", "11":"autre"}
image = ["00000101", "00010110", "01011010", "01101010",
         "00010110", "00000101", "10100000", "10000000"]
assert all(len(r)==8 for r in image)
nb_pixels=8*8
print("Nombre de pixels :",nb_pixels)
print("Taille brute (bits) :",nb_pixels*2)

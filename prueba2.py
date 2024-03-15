import os
import re

def eliminar_imagenes_con_copia(directorio):
    # Expresión regular para encontrar el patrón en el nombre del archivo
    patron = re.compile(r'copia')

    # Recorrer todos los archivos en el directorio
    for archivo in os.listdir(directorio):
        # Comprobar si el archivo coincide con el patrón
        if patron.search(archivo):
            # Construir la ruta completa del archivo
            ruta_completa = os.path.join(directorio, archivo)
            try:
                # Eliminar el archivo
                os.remove(ruta_completa)
                print(f"Se ha eliminado el archivo: {ruta_completa}")
            except Exception as e:
                print(f"No se pudo eliminar el archivo {ruta_completa}: {e}")

# Directorio donde se encuentran las imágenes
directorio = r"C:\Users\calle\OneDrive\Escritorio\Abiu\Residencia\Red\Yolov8\Parte 12"

# Llamar a la función para eliminar las imágenes con 'copia' en el nombre
eliminar_imagenes_con_copia(directorio)

# import sys
# from ultralytics import YOLO
# import cv2
# import json
# import os  # Importa el módulo os
# input_path = 'colage.jpg'
# output_path = 'detectadaprueba.jpg'
# # input_path = sys.argv[1]

# # Obtiene la ruta completa del directorio actual
# current_directory = os.getcwd()
# # Concatena la ruta del directorio actual con el nombre del archivo de salida
# full_output_path = os.path.join(current_directory, output_path)

# # output_path = sys.argv[2]
# model = YOLO('bestplagas.pt')
# img = cv2.imread(f"{input_path}")
# pred = model.predict(img)[0]
# boxes = pred.boxes.cpu().numpy()
# clases_id = boxes.cls
# names = [model.names[int(elemento)] for elemento in clases_id]
# # Convertir names a JSON
# resultados = {
#     "output_path": full_output_path,
#     "names": names
# }
# pred = pred.plot()
# cv2.imwrite(output_path,pred)
# print(json.dumps(resultados))




# import sys
# import requests
# import cv2
# import numpy as np
# from ultralytics import YOLO
# import json
# import time  # Importa el módulo time

# # URL de la imagen
# # input_path = 'https://www.aenverde.es/wp-content/uploads/2020/09/arana-roja-y-depredadores-900x600.jpg'

# input_path = sys.argv[1]
# try:
#     # Agrega un encabezado User-Agent a la solicitud HTTP
#     headers = {
#         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
#     }

#     # Descargar la imagen desde la URL
#     response = requests.get(input_path, headers=headers)
#     response.raise_for_status()  # Verifica si hubo un error en la solicitud
#     image_data = response.content

#     # Convertir los datos de la imagen en un array de bytes
#     image_array = np.frombuffer(image_data, np.uint8)

#     # Decodificar la imagen usando OpenCV
#     img = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

#     # Crear instancia del modelo YOLO
#     model = YOLO('bestplagas.pt')

#     # Realizar predicción sobre la imagen
#     pred = model.predict(img)[0]
#     boxes = pred.boxes.cpu().numpy()
#     clases_id = boxes.cls
#     names = [model.names[int(elemento)] for elemento in clases_id]

#     # Crear el nombre de archivo de salida dinámico
#     timestamp = time.strftime("%Y%m%d_%H%M%S")  # Obtener la fecha y hora actual
#     output_path = f"imagen_{timestamp}.jpg"
    
#     # Guardar las detecciones visualizadas
#     output_image = pred.plot()

#     # Guardar la imagen en firestore, desde aca
#     cv2.imwrite(output_path, output_image)

#     # Resultados
#     resultados = {
#         "output_path": output_path,
#         "names": names
#     }

#     # Imprimir resultados como JSON
#     print(json.dumps(resultados))

# except Exception as e:
#     print(f"Error al obtener la imagen: {e}")

import cv2
import sys
import numpy as np
from ultralytics import YOLO
import json
import time

try:
    # Ruta de la imagen subida a través de Multer
    input_path = sys.argv[1]  # Ajusta la ruta según donde Multer guarde la imagen

    # Decodificar la imagen utilizando OpenCV
    img = cv2.imread(input_path)

    # Crear instancia del modelo YOLO
    model = YOLO('bestplagas.pt')

    # Realizar predicción sobre la imagen
    pred = model.predict(img)[0]
    boxes = pred.boxes.cpu().numpy()
    clases_id = boxes.cls
    names = [model.names[int(elemento)] for elemento in clases_id]

    # Crear el nombre de archivo de salida dinámico
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    output_path = f"imagen_{timestamp}.jpg"

    # Guardar las detecciones visualizadas
    output_image = pred.plot()

    # Guardar la imagen resultante
    cv2.imwrite(output_path, output_image)

    # Resultados
    resultados = {
        "output_path": output_path,
        "names": names
    }

    # Imprimir resultados como JSON
    print(json.dumps(resultados))

except Exception as e:
    print(f"Error al obtener la imagen: {e}")
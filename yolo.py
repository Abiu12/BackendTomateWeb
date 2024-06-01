
# import cv2
# import sys
# import numpy as np
# from ultralytics import YOLO
# import json
# import time
# import os

# try:
#     # Ruta de la imagen subida a través de Multer
#     # Ajusta la ruta según donde Multer guarde la imagen
#     input_path = sys.argv[1]
#     # input_path = 'rotated_315_Botritis_52.jpg'
#     # Decodificar la imagen utilizando OpenCV
#     img = cv2.imread(input_path)

#     # Crear instancia del modelo YOLO
#     model = YOLO('best200.pt')

#     # Realizar predicción sobre la imagen
#     pred = model.predict(img)[0]
#     boxes = pred.boxes.cpu().numpy()
#     clases_id = boxes.cls
#     names = [model.names[int(elemento)] for elemento in clases_id]

#     # Crear el nombre de archivo de salida dinámico
#     timestamp = time.strftime("%Y%m%d_%H%M%S")
#     output_path = f"imagen_{timestamp}.jpg"

#     # Guardar las detecciones visualizadas
#     output_image = pred.plot()

#     # Guardar la imagen resultante
#     cv2.imwrite(output_path, output_image)
#     # # Obtiene la ruta completa del directorio actual
#     current_directory = os.getcwd()
#     # # Concatena la ruta del directorio actual con el nombre del archivo de salida
#     full_output_path = os.path.join(current_directory, output_path)

#     # Resultados
#     resultados = {
#         "full_path": full_output_path,
#         "name_image": output_path,
#         "names": names
#     }

#     # Imprimir resultados como JSON
#     print(json.dumps(resultados))

# except Exception as e:
#     print(f"Error al obtener la imagen: {e}")

import os
import time
import json
from ultralytics import YOLO
import numpy as np
import sys
import cv2


def draw_boxes(image, boxes, names):
    for box, name in zip(boxes, names):
        # Extraer las coordenadas del cuadro delimitador
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        # Dibujar el cuadro delimitador
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
        # Colocar el nombre del objeto detectado
        cv2.putText(image, name, (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)
    return image


try:
    # Ruta de la imagen subida a través de Multer
    input_path = sys.argv[1]
    # input_path = 'rotated_315_Botritis_52.jpg'
    # Decodificar la imagen utilizando OpenCV
    img = cv2.imread(input_path)

    # Crear instancia del modelo YOLO
    model = YOLO('best200.pt')

    # Realizar predicción sobre la imagen
    pred = model.predict(img)[0]
    boxes = pred.boxes.cpu().numpy()
    clases_id = boxes.cls
    names = [model.names[int(elemento)] for elemento in clases_id]

    # Dibujar los cuadros delimitadores y los nombres en la imagen
    output_image = draw_boxes(img, boxes, names)

    # Crear el nombre de archivo de salida dinámico
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    output_path = f"imagen_{timestamp}.jpg"

    # Guardar la imagen resultante
    cv2.imwrite(output_path, output_image)
    # Obtener la ruta completa del directorio actual
    current_directory = os.getcwd()
    # Concatena la ruta del directorio actual con el nombre del archivo de salida
    full_output_path = os.path.join(current_directory, output_path)

    # Resultados
    resultados = {
        "full_path": full_output_path,
        "name_image": output_path,
        "names": names
    }

    # Imprimir resultados como JSON
    print(json.dumps(resultados))

except Exception as e:
    print(f"Error al obtener la imagen: {e}")

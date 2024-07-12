
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
from PIL import Image, ImageDraw, ImageFont

colors = ["green", "pink", "red", "blue", "orange", "yellow"]


def draw_boxes(image, boxes, names, font_path="arial.ttf", font_size=30):
    # Convertir la imagen de OpenCV a PIL
    image_pil = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(image_pil)

    # Cargar una fuente TrueType con el tamaño especificado
    try:
        font = ImageFont.truetype(font_path, font_size)
    except IOError:
        font = ImageFont.load_default()

    for box, name in zip(boxes, names):
        # Extraer las coordenadas del cuadro delimitador
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        if (name == "Araña roja"):
            # Dibujar el cuadro delimitador
            draw.rectangle([(x1, y1), (x2, y2)], outline=colors[0], width=4)
            # Colocar el nombre del objeto detectado
            draw.text((x1, y1 - 10), name, font=font, fill=colors[0])
        elif (name == "Mosca blanca"):
            # Dibujar el cuadro delimitador
            draw.rectangle([(x1, y1), (x2, y2)], outline=colors[1], width=4)
            # Colocar el nombre del objeto detectado
            draw.text((x1, y1 - 10), name, font=font, fill=colors[1])
        elif (name == "Alternariosis"):
            # Dibujar el cuadro delimitador
            draw.rectangle([(x1, y1), (x2, y2)], outline=colors[2], width=4)
            # Colocar el nombre del objeto detectado
            draw.text((x1, y1 - 10), name, font=font, fill=colors[2])
        elif (name == "Botritis"):
            # Dibujar el cuadro delimitador
            draw.rectangle([(x1, y1), (x2, y2)], outline=colors[3], width=4)
            # Colocar el nombre del objeto detectado
            draw.text((x1, y1 - 10), name, font=font, fill=colors[3])
        elif (name == "Mildiu del tomate"):
            # Dibujar el cuadro delimitador
            draw.rectangle([(x1, y1), (x2, y2)], outline=colors[4], width=4)
            # Colocar el nombre del objeto detectado
            draw.text((x1, y1 - 10), name, font=font, fill=colors[4])
        elif (name == "Oídio"):
            # Dibujar el cuadro delimitador
            draw.rectangle([(x1, y1), (x2, y2)], outline=colors[5], width=4)
            # Colocar el nombre del objeto detectado
            draw.text((x1, y1 - 10), name, font=font, fill=colors[5])

    # Convertir la imagen de PIL a OpenCV
    image = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)
    return image


try:
    # Ruta de la imagen subida a través de Multer
    input_path = sys.argv[1]
    # input_path = 'imagen.jpg'
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
    output_image = draw_boxes(
        img, boxes, names, font_path="arial.ttf", font_size=22)

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

import sys
from ultralytics import YOLO
import cv2
import json
input_path = 'b.jpg'
output_path = 'prueba.jpg'
# input_path = sys.argv[1]
# output_path = sys.argv[2]
model = YOLO('best.pt')
img = cv2.imread(f"{input_path}")
pred = model.predict(img)[0]
boxes = pred.boxes.cpu().numpy()
clases_id = boxes.cls
names = [model.names[int(elemento)] for elemento in clases_id]
# Convertir names a JSON
resultados = {
    "output_path": output_path,
    "names": names
}
pred = pred.plot()
cv2.imwrite(output_path,pred)
print(json.dumps(resultados))

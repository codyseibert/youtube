import cv2
import tensorflow as tf
CATEGORIES = ["good", "better", "best"]
def prepare(file):
    IMG_SIZE = 50
    img_array = cv2.imread(file, cv2.IMREAD_GRAYSCALE)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 1)
model = tf.keras.models.load_model("models/CNN.model")
image = "images/stuff.jpeg"
prediction = model.predict([prepare(image)])
prediction = list(prediction[0])
print(CATEGORIES[prediction.index(max(prediction))])
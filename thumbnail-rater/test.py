import cv2
import tensorflow as tf
CATEGORIES = ["1", "2", "3", "4", "5"]
def prepare(file):
    IMG_SIZE = 50
    img_array = cv2.imread(file, cv2.IMREAD_GRAYSCALE)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 1)
model = tf.keras.models.load_model("models/CNN.model")
image = "testing.jpeg"
prediction = model.predict([prepare(image)])
prediction = list(prediction[0])
print(CATEGORIES[prediction.index(max(prediction))])
import cv2
import tensorflow as tf
# CATEGORIES = ["bad", "good"]
IMG_SIZE_W = 212
IMG_SIZE_H = 120

def prepare(file):
    img_array = cv2.imread(file, cv2.IMREAD_COLOR)
    new_array = cv2.resize(img_array, (IMG_SIZE_H, IMG_SIZE_W))
    return new_array.reshape(-1, IMG_SIZE_H, IMG_SIZE_W, 3)
model = tf.keras.models.load_model("models/CNN.model")
# bads
print(model.predict([prepare("bad.jpg")])[0][0])
print(model.predict([prepare("bad1.jpg")])[0][0])
print(model.predict([prepare("bad2.jpg")])[0][0])
print(model.predict([prepare("bad3.jpg")])[0][0])
print(model.predict([prepare("bad4.jpg")])[0][0])

# goods
print(model.predict([prepare("crossregion.png")])[0][0])
print(model.predict([prepare("cross-region-replication-2.png")])[0][0])
print(model.predict([prepare("testing.jpeg")])[0][0])
print(model.predict([prepare("why.jpeg")])[0][0])

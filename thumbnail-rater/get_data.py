import numpy as np
import os
from matplotlib import pyplot as plt
import cv2
import random
import pickle


file_list = []
class_list = []

DATADIR = "data"

# All the categories you want your neural network to detect
CATEGORIES = ["1", "2", "3", "4", "5"]

# The size of the images that your neural network will use
IMG_SIZE_W = 212
IMG_SIZE_H = 120

# Checking or all images in the data folder
for category in CATEGORIES :
	path = os.path.join(DATADIR, category)
	for img in os.listdir(path):
		img_array = cv2.imread(os.path.join(path, img), cv2.IMREAD_COLOR)

training_data = []

def create_training_data():
	for category in CATEGORIES :
		path = os.path.join(DATADIR, category)
		class_num = CATEGORIES.index(category)
		images = os.listdir(path)
		images = images[:180]
		for img in images:
			try :
				img_array = cv2.imread(os.path.join(path, img), cv2.IMREAD_COLOR)
				new_array = cv2.resize(img_array, (IMG_SIZE_H, IMG_SIZE_W))
				training_data.append([new_array, class_num])
			except Exception as e:
				pass
		

create_training_data()

random.shuffle(training_data)

X = [] #features
y = [] #labels

for features, label in training_data:
	X.append(features)
	y.append(label)

# plt.clf()
# plt.imshow(X[0])
# plt.show()
X = np.array(X).reshape(-1, IMG_SIZE_H, IMG_SIZE_W, 3)
y = np.array(y)

# Creating the files containing all the information about your model
pickle_out = open("X.pickle", "wb")
pickle.dump(X, pickle_out)
pickle_out.close()

pickle_out = open("y.pickle", "wb")
pickle.dump(y, pickle_out)
pickle_out.close()

pickle_in = open("X.pickle", "rb")
X = pickle.load(pickle_in)
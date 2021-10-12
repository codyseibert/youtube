import numpy as np
import os
import shutil
from matplotlib import pyplot as plt
import cv2

path = "thumbnail-downloader/thumbnails"
# path = "data/1"
files = os.listdir(path)
remaining = len(files)
for imgPath in files:
  plt.clf()
  img = plt.imread(os.path.join(path, imgPath))
  imgplot = plt.imshow(img)
  plt.ion()
  plt.show()
  print('rate the thumbnail')
  rating = input()
  print("rating " + rating)
  dir = rating
  print(f'{remaining} remaining')
  remaining -= 1
  shutil.move(os.path.join(path, imgPath), f'data/{dir}/{imgPath}')


import numpy as np
import pandas as pd
import cv2
import os
from PIL import Image

# image_name = '400.jpg'
# image_path = os.path.join('cepha400',image_name)
# input_image = np.asarray(Image.open(image_path))
# test_dataset = pd.read_csv('test2_senior.csv')

def find_image_labels(image_name,df):
    image_label = df.loc[df['image_path'] == image_name].values[0][1:]
    image_label=image_label/10
    print(image_label)
    return image_label

def resnet_preprocess_image(image):
    gray_image = cv2.imread(image,cv2.IMREAD_GRAYSCALE ) 
    gray_resized_image = cv2.resize(gray_image,(193,240))
    rgb_resized_image = cv2.cvtColor(gray_resized_image,cv2.COLOR_GRAY2RGB)
    final_rgb_image = np.reshape(rgb_resized_image, (1,rgb_resized_image.shape[0],rgb_resized_image.shape[1],rgb_resized_image.shape[2]))
    print(rgb_resized_image.shape)
    return final_rgb_image 

# preprocess image to be ready for prediction
def unet_preprocess_image(image):
    # step 1: take one channel(grayscale) and normalize
    image_norm = image[:,:,0] / 255.0

    # step 2: resize
    image_resized = cv2.resize(image_norm, (256,256))   # dimensions (256,256)
    image_ready = np.reshape(image_resized, (1, image_resized.shape[0], image_resized.shape[1], 1)) # (1,256,256,1) --> (batch, dimensions)

    return image_ready
#find_image_labels(image_name,test_dataset)
#resnet_preprocess_image(image_path)
#unet_preprocess_image(input_image)


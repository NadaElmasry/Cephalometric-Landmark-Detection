# -*- coding: utf-8 -*-
"""
Created on Sun Nov 20 20:58:06 2022

"""

from flask import Flask
from flask import request
from flask import jsonify
from PIL import Image
import cloudinary
from imageio import imread
import cloudinary.uploader
import numpy as np
import pandas as pd
import tensorflow as tf
import cv2
import models
import preprocessing

app = Flask(__name__)
cloudinary.config(cloud_name='dfvv2i9vk', api_key='971697155345565',
                  api_secret='ZSWT_CzGbqnuoFErIgvt0BY0PDg') 

# unet_dice = load_model('Midterm_Model.h5')
# unet_focalT = load_model('Midterm_Model_FT.h5')
# inceptionresnetmodel = tf.keras.models.load_model('inceptionresnetv2.h5')
# resnetmodel = tf.keras.models.load_model('resnet50.h5')
# masks_dict = np.load('true_masks.npz')
test_dataset = pd.read_csv('Kaggle dataset/test2_senior.csv')

@app.route("/predict", methods=['POST'])
def predict():

    message = request.get_json(force=True)

    image_url = message['cephalometricPic']
    modelname=message['modelname']
    picOrignalName=message['picOrignalName']
    print(picOrignalName)
    input_img = imread(image_url)
    print(input_img)
    true_labels = preprocessing.find_image_labels(picOrignalName,test_dataset)
    if modelname == 'InceptionResNetV2':
        result_image = models.inception_resnet_prediction(picOrignalName,input_img,modelname,true_labels)
    elif modelname == 'ResNet50':
        result_image = models.inception_resnet_prediction(picOrignalName,input_img,modelname,true_labels)

    elif modelname == 'UNet':
        result_image = models.unet_dice(input_img, picOrignalName)
    else:
        raise ValueError('Input model not found. Please enter a valid model name')


    # res = requests.get(image_url)
    # image = Image.open(BytesIO(res.content))
    # img = Image.open(requests.get( image_url, stream=True).raw)

    data = Image.fromarray(result_image)
    data.save('ceph_pic.png')
    
    upload_result = cloudinary.uploader.upload(
        'ceph_pic.png', folder="myfolder/mysubfolder/")
    
    print(upload_result)
    response = {
        'prediction': upload_result['secure_url']
    }
    print(response['prediction'])
    return jsonify(response)


if __name__ == "__main__":
    app.run()

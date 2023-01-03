import numpy as np
import matplotlib.pyplot as plt
import cv2
import tensorflow as tf
import os
from tensorflow.keras.models import load_model
import preprocessing

unet_dice_model = load_model('models/Midterm_Model.h5', compile=False)
# net_focalT = load_model('Midterm_Model_FT.h5')
#inceptionresnetmodel = tf.keras.models.load_model('models/inceptionresnetv2model.h5')
resnetmodel = tf.keras.models.load_model('models/resnet50_adabtiveLR.h5')
masks_dict = np.load('true_masks.npz')

# return image with landamarks drawn on it
def unet_draw_landmarks(image, pred_mask, true_mask, all_in_one=True):
    image_convert = image[:,:,0].astype(np.float32) # cv2 accepts dimension(256,256) and float32
    # convert to RGB
    image_rgb = cv2.cvtColor(image_convert, cv2.COLOR_GRAY2RGB) 

    if all_in_one:                                        # draw 2 masks on same image
        image_rgb[:,:,0] = image_rgb[:,:,0] + true_mask
        image_rgb[:,:,1] = image_rgb[:,:,1] + pred_mask[:,:,0]
        return image_rgb
    
    im_copy = image_rgb.copy()
    image_rgb[:,:,1] = image_rgb[:,:,1] + true_mask     # true mask
    im_copy[:,:,0] = im_copy[:,:,0] + pred_mask[:,:,0]   # predicted mask
    return image_rgb, im_copy

# unet dice loss version
def unet_dice(image, image_name):     # received image is of dimensions (1935,2400,3)
    # step 1: preproccess it
    image_preprocessed = preprocessing.unet_preprocess_image(image)   # (1,256,256,1)

    # step 2: prediction
    pred_mask = unet_dice_model.predict(image_preprocessed)  # pred mask dimensions (1,256,256,1)

    true_mask = masks_dict[image_name]
    image_w_landmarks = unet_draw_landmarks(image_preprocessed[0], pred_mask[0], true_mask, True)
    image_w_landmarks_resize = cv2.resize(image_w_landmarks, (1935,2400))
    return image_w_landmarks_resize



# # unet focal tversky version
# def unet_focalt(image, image_name):     # received image is of dimensions (1935,2400,3)
#     # step 1: preproccess it
#     image_preprocessed = preprocessing.unet_preprocess_image(image) # (1,256,256,1)

#     # step 2: prediction
#     pred_mask = unet_focalT.predict(image_preprocessed)  # pred mask dimensions (1,256,256,1)

#     true_mask = masks_dict[image_name]
#     image_w_landmarks = unet_draw_landmarks(image_preprocessed[0], pred_mask[0], true_mask, True) # final image with landmarks (256,256,3)
#     image_w_landmarks_resize = cv2.resize(image_w_landmarks, (1935,2400))
#     return image_w_landmarks_resize
    
def inception_resnet_prediction(image_name,image,model_name,true_labels):
    if model_name == 'InceptionResNetV2':
        model = inceptionresnetmodel
    elif model_name == 'ResNet50':
        model = resnetmodel
    image_name=os.path.join(r"F:\4th year\biometrics\models\Kaggle dataset\cepha400",image_name)
    image = preprocessing.resnet_preprocess_image(image_name)
    predicted_labels = model.predict(image)
    print(predicted_labels)
    print(true_labels)
    output_image =np.copy(image)[0]
    for i in range(0,(len(true_labels)-1),2):
        output_image = cv2.circle(output_image,(int(predicted_labels[0][i]),int(predicted_labels[0][i+1])), 2, (255,0,0),-1)
        output_image = cv2.circle(output_image,(int(true_labels[i]),int(true_labels[i+1])), 2, (0,255,0),-1)
    print(output_image.shape)
    
    return output_image



     
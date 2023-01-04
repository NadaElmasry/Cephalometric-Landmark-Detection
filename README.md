
# Cepheo

Cepheo is an innovative DL driven online orthodontic and orthognathic platform for dental clinicians.


## Description

We developed a node.js and flask APIs connected to MongoDb database, through which we deployed the best model. It
automatically performs landmark positioning. It can be used as
an online diagnostic software that reduces the time and effort
of orthodontists involved in the orthodontic case and diagnosis.



![Logo](https://i.imgur.com/DttasuM.png)


## 🚀 Features

- The dentical clinician can add new patient via upload page.
- View the all patients data in one page in the repository part.
- Through the repository section also the dentical clinician can also update, delete the medical record for each patient.
- After the analysis is done, the patient record can be saved as a PDF report or image.
- We also provide in our platform help page that contains frequently asked questions and short instruction video in our youtube channel to provide information of everthing till getting analysis done.


## 🖥️ Tech Stack

**Client:** HTML, CSS, JS

**Server:** Node, MongoDB, Flask

**Model:** UNet, Inception, Resnet


## 📂 Dataset
Detection of cephalometric landmarks with Deep learning models. Dataset:

- 400 X-ray images each image contains 19 landmarks.
- Excel sheets containg X and Y positions for each landmark in each image.

![Landmark detection](https://i.imgur.com/zxl6jGj.jpg)


## Models Notebook

- `Binary Mask Trial Unet.ipynb` The mask used for segmentation is a binary 1 channel array, where 1's represent landmarks location and 0's represent the background.

- `Unet_and_get_ROIs_for_Stage2.ipynb` The mask used for segmentation is a 20 channels mask, where each channel represent a landmark and the last channel represent the background. Each channel was filled using the following equation.

![Home Page Section](https://i.imgur.com/IpeNZp6.jpeg)

- `resnet_inception_final.ipynb`

- `resnet_rois.ipynb`
## Installation

Install node.js  👉 [Download](https://nodejs.org/en/download/)

To use the Model 👉 [Download](https://drive.google.com/file/d/1jJ5fFpCRLowJsFFXY9RRb8PIeLLwTUyS/view?usp=sharing)

## Dependencies

Install
- **FlaskAPI:**  Flask, TensorFlow, OpenCv, Numpy 
- **NodeAPI:**  `npm install` command
    
## Run Locally

Start the node server 

```bash
  node app.js
```

Add model in `models` folder then start flask server

```bash
  run main.py
```

Start the client

```bash
  run index.html
```


## 🛠 Skills
HTML, CSS, Javascript, Node, Flask, MongoDB and deep learning


## Screenshots

### Cepheo - Home Page
![Home Page Section](https://i.imgur.com/68AYXuo.png)

### Cepheo - Upload Section
![Upload Page Section](https://i.imgur.com/5Est4Uz.png)

### Cepheo - Repository Section
![Repository Page Section](https://i.imgur.com/oELAD5r.png)

### Cepheo - Result Section
![Result Page Section](https://i.imgur.com/ZE6oFXy.png)

 - Sample of saved analyzed image

![analyzed image](https://i.imgur.com/NWyHYfs.png)

- Sample of our patient medical record
![Patient Record](https://i.imgur.com/V9IbkcU.jpeg)

### Cepheo - Help Page
![Help Page Section](https://i.imgur.com/SVnmonW.png)


## ⚡ Demo

#### That is a short instruction video on our youtube channel to learn everything until the analysis is done!
[![Watch the video](https://i.imgur.com/aoBl2Ml.png)](https://youtu.be/C4l3qPer4XQ)



## Support

For support, email cepheo00@gmail.com or join our community on facebook.


## Links

[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://youtu.be/C4l3qPer4XQ)
[![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=Facebook&logoColor=white)](https://www.facebook.com/profile.php?id=100089195230086)




## Feedback

If you have any feedback, please reach out to us at cepheo00@gmail.com


## Authors

- [@tasneemkhaled](https://github.com/Tasneem-Elamary)
- [@maryammahmoud](https://github.com/Mariam924)
- [@hadeerkhaled](https://github.com/hadeer-khaled)
- [@nouranMuhammed](https://github.com/hadeer-khaled)
- [@Lailahamdy](https://github.com/lailahamdy)
- [@nadaAhmed](https://github.com/NadaElmasry)
- [@marwahelmy](https://github.com/MarwaHelmy999)
- [@hanaasalah](https://github.com/hanaa-salah)
- [@nadaabdelrahman](https://github.com/nadapopp)



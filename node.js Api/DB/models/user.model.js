import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    identifier: { type: Number, required: true ,uniqe:true },
    // email: { type: String},
    // password: { type: String },
    age: { type: Number, required: true },
    modelname: {
        type: String,
        default: "InceptionResNetV2",
        enum: ['InceptionResNetV2', 'ResNet50','UNet']
    },
    gender: {
        type: String,
        default: "Male",
        enum: ['Male', 'Female']
    },
    
    cephalometricPic: String,
    perdictedpic:String,
    picOrignalName:String,
    landmarks: Array,
    comments:String
   
}, {
    timestamps: true
})

export const userModel  =  model('User', userSchema)
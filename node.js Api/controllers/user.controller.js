
import { userModel } from "../DB/models/user.model.js"
import cloudinary from "../service/cloudinary.js";
import fs  from "fs";
import { parse } from "csv-parse";
import axios from 'axios'

const array = ["test1_senior.csv", "test2_senior.csv", "train_senior.csv"]

export const postInfo=async(req,res)=>{
    try {
     
        if (!req.file) {
         return   res.json({ message: "Please upload u image" })
        } else {
          
            
          
            const {secure_url} = await cloudinary.uploader.upload(req.file.path, {
                folder: `biometric/${req.body.identifier}`
            })
            console.log(secure_url);
            req.body.cephalometricPic=secure_url
            req.body.picOrignalName=req.file.originalname

          
            
            axios.post('http://127.0.0.1:5000/predict',JSON.stringify(req.body))
             .then(async function (response) {
              
              req.body.perdictedpic=response.data.prediction
             
              const newUser = new userModel(req.body)
               const savedUser = await newUser.save()
           
          
           return res.status(200).json({ message: "Done", savedUser })
            })
            .catch(function (error) {
              
            })
            
        }
        
    } catch (error) {
       return  res.status(500).json({ message: "catch error",error: error.message })
    }
    
}

export const getPatientsInfo=async(req,res)=>{
    const { id} = req.query
    
        
            const users=await userModel.find({}).select("-_id identifier age gender comments cephalometricPic createdAt")
           return  res.status(200).json({ message: "Done", users })
        

    
   
}

export const getpatientById=async(req,res)=>{
    const{id}=req.params
   
    const user=await userModel.findOne({identifier:id}).select("-_id identifier age gender comments perdictedpic createdAt")
   return  res.status(200).json({ message: "Done", user })
  }

export const getPerdictedpic=async(req,res)=>{
  const{id}=req.params
  const user=await userModel.findOne({identifier:id}).select("-_id perdictedpic ")
  return res.status(200).json({ message: "Done", user })
}


export const postPic=async(req,res)=>{
    const{id}=req.params
    const image=await userModel.findOne({identifier:id}).select("-_id cephalometricPic picOrignalName modelname")
    const  message=image
    console.log(JSON.stringify(message));
    console.log();
    axios.post('http://127.0.0.1:5000/predict',JSON.stringify(image))
  .then(async function (response) {
    // handle success
    console.log(response.data.prediction);
    const updateduser=await userModel.findOneAndUpdate({identifier:id},{perdictedpic:response.data.prediction},{new:true})
    res.status(200).json({ message: "Done" ,updateduser})
  })
  .catch(function (error) {
    
  })
  
  }

  export const updateModelName=async(req,res)=>{
    const{id}=req.params
    const{modelname}=req.query
    const image=await userModel.findOneAndUpdate({identifier:id},{modelname},{new:true}).select("-_id cephalometricPic picOrignalName modelname")
    const  message=image
    
    axios.post('http://127.0.0.1:5000/predict',JSON.stringify(image))
  .then(async function (response) {
    
    const updateduser=await userModel.updateOne({identifier:id},{perdictedpic:response.data.prediction})
    return res.status(200).json({ message: "Done" })
  })
  .catch(function (error) {
    // handle error
   
  })
  
  }



export const deletePatient=async(req,res)=>{
    const{id}=req.params
    const user=await userModel.deleteOne({identifier:id})
    if(user.deletedCount){
       return res.status(200).json({ message: "Done", user })
    }
    else{
       return res.status(400).json({ message: "in-valid id" })
    }
}
export const updatePatient=async(req,res)=>{
    const{id}=req.params
    const user=await userModel.updateOne({identifier:id},req.body)
    if(user.modifiedCount){
        return res.status(200).json({ message: "Done", user })
    }
    else{
       return  res.status(400).json({ message: "in-valid id" })
    }
}
//getLandmark(ImageName,id){
//   try {
//     array.forEach(function (item, index) {

//     fs.createReadStream(`./assets/${item}`)
//           .pipe(parse({ delimiter: ",", from_line: 2 }))
//           .on("data",async function (row) {
//             if (row[0]==ImageName){
//                 var cordanites= row.slice(1, 3);
//                 console.log(cordanites);
//                 await userModel.updateOne({ _id:id }, { landmarks: cordanites })
               
//             }
            
//           })
//           .on("error", function (error) {
//             console.log(error.message);
//           })
//         })
//   } catch (error) {
//     res.status(500).json({ message: "catch error", error })     
//   }
//   }
    
 
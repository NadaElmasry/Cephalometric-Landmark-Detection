import { Router } from "express";
import {  deletePatient, getpatientById, getPatientsInfo, getPerdictedpic,  postInfo ,postPic,updateModelName, updatePatient } from "../controllers/user.controller.js";
import { HME, myMulter, validationTypes } from "../service/clodMulter.js";
const router = Router()


router.post("/",myMulter(validationTypes.iamge).single('image'),HME,postInfo)
router.get("/",getPatientsInfo)
router.get("/landmark/:id",getPerdictedpic)
router.get("/info/:id",getpatientById)
//router.post("/pic/:id",postPic)
router.patch("/model/:id",updateModelName)
router.delete("/:id",deletePatient)
router.put("/:id",updatePatient)
export default router
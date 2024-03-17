import express from 'express';
import Institutes from '../models/Institute.js';
import instituteCtrl from '../controllers/instituteController.js';
import { auth } from '../middleware/middleware.js';

const router = express.Router();


router.get("/getInstitutesById", auth, instituteCtrl.getInstituteById)
router.get("/getInstitutesCount", auth, instituteCtrl.getInstitutesCount)
router.get("/getInstitutes", auth, instituteCtrl.getInstitutes)
router.post("/addRating", auth, instituteCtrl.addRating)
router.post("/updateRating", auth, instituteCtrl.updateRating)
router.post("/deleteRating", auth, instituteCtrl.deleteRating)
router.get("/search", auth, instituteCtrl.search)
router.get("/searchByCategory", auth, instituteCtrl.searchByCategory)
router.get("/categories", auth, instituteCtrl.getCategories)
router.get("/getByCategories", auth, instituteCtrl.getByCategories)
router.post("/sendEmail", auth, instituteCtrl.sendEmail)





export default router;
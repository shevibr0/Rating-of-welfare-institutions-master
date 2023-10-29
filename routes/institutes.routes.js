import express from 'express';
import  Institutes  from '../models/Institute.js';
import instituteCtrl from '../controllers/instituteController.js';
import { auth } from '../middleware/middleware.js';

const router = express.Router();

router.get('/', async(req, res) => {
    const data= await Institutes.find({})
    res.json({data})
})

router.post("/addRating",auth, instituteCtrl.addRating)
router.post("/updateRating",auth, instituteCtrl.updateRating)
router.post("/deleteRating",auth, instituteCtrl.deleteRating)


export default router;
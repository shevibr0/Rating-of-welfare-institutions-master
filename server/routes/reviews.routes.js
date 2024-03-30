import express from 'express';
import reviewCtrl from '../controllers/reviewController.js';
import { auth } from '../middleware/middleware.js';


const router = express.Router();

router.get('/getReviews', auth, reviewCtrl.getReviews)
router.get('/getImages', auth, reviewCtrl.getImages)
router.get('/getReviewDetails', auth, reviewCtrl.getReviewDetails)
router.post('/getReviewIdByInstitutesId', auth, reviewCtrl.getReviewIdByInstitutesId)
router.post('/addReview', auth, reviewCtrl.addReview)
router.post('/deleteReview', auth, reviewCtrl.deleteReview)
router.post('/uploadImages', auth, reviewCtrl.uploadImages)




export default router;
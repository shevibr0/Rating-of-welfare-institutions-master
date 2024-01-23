import express from 'express';
import reviewCtrl from '../controllers/reviewController.js';
import { auth } from '../middleware/middleware.js';


const router = express.Router();

router.get('/getReviews', auth, reviewCtrl.getReviews)
router.get('/getReviewDetails', auth, reviewCtrl.getReviewDetails)
router.post('/addReview', auth, reviewCtrl.addReview)
router.post('/deleteReview', auth, reviewCtrl.deleteReview)



export default router;
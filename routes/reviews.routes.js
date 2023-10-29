import express from 'express';
import reviewCtrl from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ msg: "reviews router is work" })
})
router.post('/addReview', reviewCtrl.addReview)
router.post('/deleteReview', reviewCtrl.deleteReview)
router.post('/updateReview', reviewCtrl.updateReview)

export default router;
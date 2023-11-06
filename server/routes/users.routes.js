import express from 'express';
import authCtrl from '../controllers/authController.js';
import { auth } from '../middleware/middleware.js';
import { userCtrl } from '../controllers/userController.js';

const router = express.Router();
router.get('/', (req, res) => {
    res.json({ msg: "users router is work" })
})

router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)
router.post('/logout', authCtrl.logout)

router.get('/checkAuth', auth, authCtrl.checkAuth)
router.get('/my-profile', auth, userCtrl.myProfile)

export default router;


//Error exmplae to login route.get('/login/:email/:password', authCtrl.login)
//right way to login route.post('/login', authCtrl.login)
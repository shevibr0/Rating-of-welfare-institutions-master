import jwt from 'jsonwebtoken';
import { secret } from '../config/secret.js';

export const auth = (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return next({ status: 401, message: 'User not authenticated' })
    }

    try {
        //. Verify token returns the payload of the token
        const decoded = jwt.verify(accessToken, secret.JWT_SECRET);
        req.payload = decoded; // decoded is the payload => { id: user._id, role: user.role }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', errorCode: 'MW', error });
    }
}

//route => middleware => controller
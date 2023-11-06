import jwt from 'jsonwebtoken';
import { secret } from '../config/secret.js';

// jwt.sign() creates a new token (payload, secretOrPrivateKey, [options, callback])
//payload = { id: user._id, role: user.role }
//? jwt.sign returns a token

// jwt.verify() verifies the token (token, secretOrPublicKey, [options, callback])
//? jwt.verify returns the payload

//? create token => to example:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
export const createToken = ({ role, _id }, expired) => {
    //expired => seconds:"60s" minutes:"60min" hours:"24h" days:"30d"
    const token = jwt.sign({ _id, role }, secret.JWT_SECRET, { expiresIn: expired });
    return token;
}
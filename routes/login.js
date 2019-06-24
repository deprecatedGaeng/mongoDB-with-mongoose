import express from 'express';
import jwt from 'jsonwebtoken';
import {confCrypto, confJwt} from '../config';
import crypto from 'crypto';
import User from '../models/User';

const router = express.Router();

router.post('/',(req,res)=>{
    const {user_id , password} = req.body;
    if(!user_id || !password){
        res.status(400).send();
    }else{
        User.findOne({user_id: user_id}, (err, user) => {
            if(err) throw err;
            const savedPw = user.password;
            console.log(confCrypto.alg, confCrypto.secret)
            const decipher = crypto.createDecipher(confCrypto.alg, confCrypto.secret);
            let decryption = decipher.update(savedPw, 'base64', 'utf8');
            decryption = decipher.final('utf8');
            if(password === decryption){
                const token = jwt.sign({ user_id,"내가":"조경근이당!!" }, confJwt.secret, {expiresIn : confJwt.expiresIn});
                res.json({
                    success: true,
                    token
                })
            }else{
                res.json({
                    success : false
                })
            }
            
        })
    }
})

export default router;
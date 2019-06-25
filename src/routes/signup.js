import express from 'express';
import crypto from 'crypto';
import {confCrypto} from '../config';
import User from '../models/User';

const router = express.Router();


router.post('/', (req, res) => {
    const {user_id,password,email,phone,nickname} = req.body;
    const cipher = crypto.createCipher(confCrypto.alg, confCrypto.secret);
    let encryption = cipher.update(password, 'utf8', 'base64');
    encryption = cipher.final('base64');
    const user = new User();
    user.user_id = user_id;
    user.password = encryption;
    user.email = email;
    user.phone = phone;
    user.nickname = nickname;
   
    user.save( (err) => {
        if(err){
            console.error(err);
            res.json({
				message : 'ERROR'
			});
            return;
        }
        res.json({
			message : 'SUCCESS'
		});
    });
});

router.get('/getUser/:id', (req, res) => {
	const {id} = req.params;
    User.findOne({_id: id}, (err, board) => {
        if(err) return res.status(500).json({error: err});
        if(board.length === 0) return res.status(404).json({error: 'book not found'});
        res.json(board);
    })
});

export default router;
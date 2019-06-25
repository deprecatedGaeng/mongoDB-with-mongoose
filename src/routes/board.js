import express from 'express';
import jwt from 'jsonwebtoken';
import { confJwt } from '../config';
import Board from '../models/Board';

const router = express.Router();

// GET BOARD
router.get('/getBoard', (req, res) => {
    const token = req.headers['x-access-token'];
    if(!token){
        res.json({
            message : 'NOT LOGGED IN'
        })
    }else{
        jwt.verify(token, confJwt.secret, (err, decoded) => {
            if(!err){
                Board.find( (err, board) => {
                    if(err) return res.status(500).send({error: 'database failure'});
                    res.json({
                        list : board
                    });
                })
            }else{
                res.json({message : 'token expired'})
            }
        })
    }
});

router.get('/getBoard/:id', (req, res) => {
	const {id} = req.params;
	Board.findOne({_id: id}, (err, board) => {
        if(err) return res.status(500).json({error: err});
        if(board.length === 0) return res.status(404).json({error: 'book not found'});
        res.json(board);
    })
});
router.get('/getBoard/author/:author', (req, res) => {
	const {author} = req.params;
	Board.find({author: author}, (err, board) => {
        if(err) return res.status(500).json({error: err});
        if(board.length === 0) return res.status(404).json({error: 'book not found'});
        res.json(board);
    })
});
// CREATE TODO
router.post('/create', (req, res) => {
	const {title,content,author,count} = req.body;
    const board = new Board();
    board.title = title;
    board.content = content;
    board.author = author;
    board.count = count;
   
    board.save( (err) => {
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

// UPDATE THE BOOK
router.put('/books/:book_id', (req, res) => {
  res.end();
});
 
// // DELETE BOOK
// router.delete('/books/:book_id', (req, res) => {
//   res.end();
// });

 
export default router;
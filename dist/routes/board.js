'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _Board = require('../models/Board');

var _Board2 = _interopRequireDefault(_Board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// GET BOARD
router.get('/getBoard', function (req, res) {
    var token = req.headers['x-access-token'];
    if (!token) {
        res.json({
            message: 'NOT LOGGED IN'
        });
    } else {
        _jsonwebtoken2.default.verify(token, _config.confJwt.secret, function (err, decoded) {
            if (!err) {
                _Board2.default.find(function (err, board) {
                    if (err) return res.status(500).send({ error: 'database failure' });
                    res.json({
                        list: board
                    });
                });
            } else {
                res.json({ message: 'token expired' });
            }
        });
    }
});

router.get('/getBoard/:id', function (req, res) {
    var id = req.params.id;

    _Board2.default.findOne({ _id: id }, function (err, board) {
        if (err) return res.status(500).json({ error: err });
        if (board.length === 0) return res.status(404).json({ error: 'book not found' });
        res.json(board);
    });
});
router.get('/getBoard/author/:author', function (req, res) {
    var author = req.params.author;

    _Board2.default.find({ author: author }, function (err, board) {
        if (err) return res.status(500).json({ error: err });
        if (board.length === 0) return res.status(404).json({ error: 'book not found' });
        res.json(board);
    });
});
// CREATE TODO
router.post('/create', function (req, res) {
    var _req$body = req.body,
        title = _req$body.title,
        content = _req$body.content,
        author = _req$body.author,
        count = _req$body.count;

    var board = new _Board2.default();
    board.title = title;
    board.content = content;
    board.author = author;
    board.count = count;

    board.save(function (err) {
        if (err) {
            console.error(err);
            res.json({
                message: 'ERROR'
            });
            return;
        }
        res.json({
            message: 'SUCCESS'
        });
    });
});

// UPDATE THE BOOK
router.put('/books/:book_id', function (req, res) {
    res.end();
});

// // DELETE BOOK
// router.delete('/books/:book_id', (req, res) => {
//   res.end();
// });


exports.default = router;
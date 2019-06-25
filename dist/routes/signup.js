'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _config = require('../config');

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
    var _req$body = req.body,
        user_id = _req$body.user_id,
        password = _req$body.password,
        email = _req$body.email,
        phone = _req$body.phone,
        nickname = _req$body.nickname;

    var cipher = _crypto2.default.createCipher(_config.confCrypto.alg, _config.confCrypto.secret);
    var encryption = cipher.update(password, 'utf8', 'base64');
    encryption = cipher.final('base64');
    var user = new _User2.default();
    user.user_id = user_id;
    user.password = encryption;
    user.email = email;
    user.phone = phone;
    user.nickname = nickname;

    user.save(function (err) {
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

router.get('/getUser/:id', function (req, res) {
    var id = req.params.id;

    _User2.default.findOne({ _id: id }, function (err, board) {
        if (err) return res.status(500).json({ error: err });
        if (board.length === 0) return res.status(404).json({ error: 'book not found' });
        res.json(board);
    });
});

exports.default = router;
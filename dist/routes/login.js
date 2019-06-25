'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
    var _req$body = req.body,
        user_id = _req$body.user_id,
        password = _req$body.password;

    if (!user_id || !password) {
        res.status(400).send();
    } else {
        _User2.default.findOne({ user_id: user_id }, function (err, user) {
            if (err) throw err;
            var savedPw = user.password;
            console.log(_config.confCrypto.alg, _config.confCrypto.secret);
            var decipher = _crypto2.default.createDecipher(_config.confCrypto.alg, _config.confCrypto.secret);
            var decryption = decipher.update(savedPw, 'base64', 'utf8');
            decryption = decipher.final('utf8');
            if (password === decryption) {
                var token = _jsonwebtoken2.default.sign({ user_id: user_id, "내가": "조경근이당!!" }, _config.confJwt.secret, { expiresIn: _config.confJwt.expiresIn });
                res.json({
                    success: true,
                    token: token
                });
            } else {
                res.json({
                    success: false
                });
            }
        });
    }
});

exports.default = router;
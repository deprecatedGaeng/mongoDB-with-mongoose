'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var confJwt = exports.confJwt = {
    expiresIn: 1000 * 60 * 60 * 24 * 1, // A day 1000 * 60 * 60 * 24 * 1
    secret: 'gaengsworld-jwt-secret'
};

var confCrypto = exports.confCrypto = {
    secret: 'gaengsworld',
    alg: 'aes-256-cbc'
};
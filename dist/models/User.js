'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
  user_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String },
  nickname: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

exports.default = _mongoose2.default.model('user', userSchema);
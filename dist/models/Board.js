'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boardSchema = new _mongoose2.default.Schema({
  //uuid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  count: { type: Number }
}, {
  timestamps: true
});

exports.default = _mongoose2.default.model('board', boardSchema);
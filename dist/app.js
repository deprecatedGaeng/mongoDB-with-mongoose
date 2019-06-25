'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _board = require('./routes/board');

var _board2 = _interopRequireDefault(_board);

var _signup = require('./routes/signup');

var _signup2 = _interopRequireDefault(_signup);

var _login = require('./routes/login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//ENV CONFIG
_dotenv2.default.config();

//ROUTES


var app = (0, _express2.default)();
var port = process.env.PORT || 4500;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

//ADD ROUTES
app.use('/board', _board2.default);
app.use('/signup', _signup2.default);
app.use('/login', _login2.default);
//MONGOOSE
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(function () {
  return console.log('Successfully connected to mongodb');
}).catch(function (e) {
  return console.error(e);
});

//LISTEN
app.listen(port, function () {
  return console.log('Server listening on port http://localhost:' + port);
});

exports.default = app;
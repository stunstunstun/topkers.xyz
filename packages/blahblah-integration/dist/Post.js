"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = function Post(id, title, link, desc, author) {
  (0, _classCallCheck3.default)(this, Post);

  this.id = id;
  this.title = title;
  this.link = link;
  this.desc = desc;
  this.author = author;
};

exports.default = Post;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.devblog = exports.reddit = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var reddit = exports.reddit = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
    var body;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return request(redditEndpoint, options);

          case 2:
            body = _context.sent;
            return _context.abrupt('return', body.data.children.map(function (item) {
              return new _Post2.default(item.title, item.url, item.domain, item.author);
            }));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function reddit(_x) {
    return _ref.apply(this, arguments);
  };
}();

var devblog = exports.devblog = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(options) {
    var body;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return request(devblogEndpoint, options);

          case 2:
            body = _context2.sent;
            return _context2.abrupt('return', body.map(function (item) {
              return new _Post2.default(item.title, item.link, item.description, item.author);
            }));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function devblog(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _Post = require('./Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redditEndpoint = 'https://www.reddit.com/r/programming/top/.json';
var devblogEndpoint = 'https://awesome-devblog.herokuapp.com/feeds/domestic';

function createQuery(parameters) {
  return Object.keys(parameters).map(function (key) {
    return key + '=' + parameters[key];
  }).join('&');
}

function request(endpoint, options) {
  var method = options.method;

  var url = endpoint;
  if (method === 'GET') {
    url = url.concat('?').concat(createQuery(Object.assign({}, options.body)));
    delete options.body;
  }
  return (0, _isomorphicFetch2.default)(url, options).then(function (response) {
    var body = response.json();
    if (response.status >= 400) {
      throw new Error('HTTP reponse is not OK. ' + response.status + ' ' + url + ' ' + JSON.stringify(body, null, 2));
    }
    return body;
  });
}

exports.default = _Post2.default;
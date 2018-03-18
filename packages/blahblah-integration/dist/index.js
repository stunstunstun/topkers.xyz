'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.devblog = exports.githubTrending = exports.gitHubRepo = exports.reddit = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var reddit = exports.reddit = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
    var response, body;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return request(redditEndpoint, options);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            body = _context.sent;
            return _context.abrupt('return', body.data.children.map(function (item) {
              var post = item.data;
              return new _Post2.default(post.id, post.title, post.url, post.domain, post.author);
            }));

          case 7:
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

var gitHubRepo = exports.gitHubRepo = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(languages) {
    var aMonthAgo, options, response, body;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            aMonthAgo = (0, _moment2.default)().subtract(30, 'days').format('YYYY-MM-DD');
            options = {
              method: 'GET',
              body: {
                q: 'language:' + languages + '+created:%3E' + aMonthAgo,
                sort: 'stars',
                order: 'desc'
              }
            };
            _context2.next = 4;
            return request(githubRepoEndpoint, options);

          case 4:
            response = _context2.sent;
            _context2.next = 7;
            return response.json();

          case 7:
            body = _context2.sent;
            return _context2.abrupt('return', body.items.map(function (item) {
              return new _Post2.default(item.id, item.full_name, item.html_url, item.language, '\uD83E\uDD29 ' + item.stargazers_count);
            }));

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function gitHubRepo(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var githubTrending = exports.githubTrending = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var options, response, body, $, repos;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = {
              method: 'GET',
              body: {
                since: 'weekly'
              }
            };
            _context3.next = 3;
            return request(githubTrendingEndpoint, options);

          case 3:
            response = _context3.sent;
            _context3.next = 6;
            return response.text();

          case 6:
            body = _context3.sent;
            $ = _cheerio2.default.load(body);
            repos = $('li', '.explore-content ol.repo-list');
            return _context3.abrupt('return', repos.map(function (index, repo) {
              var repoNode = $(repo);
              var name = repoNode.find('h3 a').text().trim();
              var desc = repoNode.find('.py-1 p').text().trim();
              var stars = repoNode.find('a svg.octicon-star').parent().text().replace('Star', '🤩').replace(/\n/g, '').trim();
              var url = 'https://github.com' + repoNode.find('h3 a').attr('href');
              return new _Post2.default(name, name, url, desc, stars);
            }).get());

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function githubTrending() {
    return _ref3.apply(this, arguments);
  };
}();

var devblog = exports.devblog = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(start, end) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', _feeds2.default.slice(start, end).map(function (item) {
              return new _Post2.default(item.author, item.title, item.link, item.description, item.author);
            }));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function devblog(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Post = require('./Post');

var _Post2 = _interopRequireDefault(_Post);

var _feeds = require('./feeds');

var _feeds2 = _interopRequireDefault(_feeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redditEndpoint = 'https://www.reddit.com/r/programming/top/.json';
var githubRepoEndpoint = 'https://api.github.com/search/repositories';
var githubTrendingEndpoint = 'https://github.com/trending';
// const devblogEndpoint = 'https://awesome-devblog.herokuapp.com/feeds/domestic'
// const awesomeblogEndpoint = 'https://awesome-blogs.petabytes.org/feeds'

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
    if (response.status >= 400) {
      throw new Error('HTTP/1.1 ' + response.status + ' ' + method + ' ' + url);
    }
    return response;
  });
}

exports.default = _Post2.default;
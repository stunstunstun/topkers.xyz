'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})

var _isomorphicFetch = require('isomorphic-fetch')

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch)

var _log4js = require('log4js')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments)
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg)
          var value = info.value
        } catch (error) {
          reject(error)
          return
        }
        if (info.done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value)
            },
            function(err) {
              step('throw', err)
            },
          )
        }
      }
      return step('next')
    })
  }
}

var logger = (0, _log4js.getLogger)()
var redditEndpoint = 'https://www.reddit.com/r/programming/top/.json'

function createQuery(parameters) {
  return Object.keys(parameters)
    .map(function(key) {
      return key + '=' + parameters[key]
    })
    .join('&')
}

function request(endpoint, options) {
  var method = options.method

  var url = endpoint
  if (method === 'GET') {
    url = url.concat('?').concat(createQuery(Object.assign({}, options.body)))
    delete options.body
  }
  return (0, _isomorphicFetch2.default)(url, options)
    .then(function(response) {
      var body = response.json()
      if (response.status >= 400) {
        throw new Error('HTTP reponse is not OK. ' + response.status + ' ' + url + ' ' + JSON.stringify(body, null, 2))
      }
      return body
    })
    .catch(function(err) {
      logger.error(err)
      return err
    })
}

exports.default = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(options) {
      var body
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2
                return request(redditEndpoint, options)

              case 2:
                body = _context.sent
                return _context.abrupt('return', body.data.children)

              case 4:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        this,
      )
    }),
  )

  function reddit(_x) {
    return _ref.apply(this, arguments)
  }

  return reddit
})()

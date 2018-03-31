const r = m => require.resolve(m)

function preset(context, options = {}) {
  const { browser = false, debug = false } = options
  const { NODE_ENV, BABEL_ENV } = process.env
  const PRODUCTION = (BABEL_ENV || NODE_ENV) === 'production'
  const browserConfig = {
    useBuiltIns: false,
    targets: {
      browsers: [`last 4 versions`, `safari >= 7`, "ie >= 11"],
      uglify: PRODUCTION,
    },
  }
  const nodeConfig = {
    targets: {
      node: 'current',
    },
  }
  return {
    presets: [
      [
        r('babel-preset-env'),
        Object.assign(
          {
            loose: true,
            debug: !!debug,
            useBuiltIns: true,
            modules: 'commonjs',
          },
          browser ? browserConfig : nodeConfig
        ),
      ],
      r('babel-preset-react-app'),
    ],
    plugins: [
      r('babel-plugin-transform-object-rest-spread'),
      [
        r('babel-plugin-transform-runtime'),
        {
          polyfill: !!browser,
        },
      ],
    ],
  }
}

module.exports = preset
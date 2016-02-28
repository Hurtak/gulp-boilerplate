const path = require('path')

const __DEV__ = false

module.exports = {

  entry: [
    // 'babel-polyfill',
    path.resolve(__dirname, '../app/scripts/app.js')
  ],

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist/scripts')
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: [],
          plugins: [
            'check-es2015-constants',
            'transform-es2015-arrow-functions',
            'transform-es2015-block-scoped-functions',
            'transform-es2015-block-scoping',
            'transform-es2015-classes',
            'transform-es2015-computed-properties',
            'transform-es2015-destructuring',
            'transform-es2015-for-of',
            'transform-es2015-function-name',
            'transform-es2015-literals',
            'transform-es2015-modules-commonjs',
            'transform-es2015-object-super',
            'transform-es2015-parameters',
            'transform-es2015-shorthand-properties',
            'transform-es2015-spread',
            'transform-es2015-sticky-regex',
            'transform-es2015-template-literals',
            'transform-es2015-typeof-symbol',
            'transform-es2015-unicode-regex',

            ...(__DEV__ ? [
              'transform-async-to-generator'
            ] : [
              "transform-async-to-generator",
              'transform-regenerator',
              "transform-runtime",
            ]),

            'transform-exponentiation-operator',
            'transform-object-rest-spread',

            'transform-strict-mode',
          ],
          cacheDirectory: true
        }
      }
    ]
  }

}

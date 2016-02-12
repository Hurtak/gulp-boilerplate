const path = require('path')

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
          presets: [
            'stage-0',
            'es2015'
          ],
          plugins: [
            // 'transform-runtime',
            'transform-strict-mode'
          ],
          cacheDirectory: true
        }
      }
    ]
  }

}


const path = require('path')

module.exports = {

  entry: path.resolve(__dirname, '../app/scripts/app.js'),

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist/scripts')
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2'],
          plugins: ['transform-runtime', 'transform-regenerator'],
          cacheDirectory: true
        }
      }
    ]
  }

}

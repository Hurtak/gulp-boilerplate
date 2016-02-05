
module.exports = {

  entry: './app/scripts/app.js',

  output: {
    filename: 'app.js',
    path: './dist/scripts'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2'],
          plugins: ['transform-runtime'],
          cacheDirectory: true
        }
      }
    ]
  }

}

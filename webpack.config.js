module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.css']
  },
  output: {
    filename: 'documentup.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader', 'postcss-loader']
      }
    ]
  }
}
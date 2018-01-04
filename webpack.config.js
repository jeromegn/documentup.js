module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.css', '.scss', '.pug']
  },
  output: {
    filename: 'documentup.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ['to-string-loader', 'css-loader', 'postcss-loader']
      // },
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      }
    ]
  }
}
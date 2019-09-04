const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  stats: {
    colors: true,
  },
  devtool: 'inline-source-map',
  // devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    // host: '0.0.0.0', // To be externally accessible
    port: 9000, // Default is 8080
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // use: {
        // loader: 'babel-loader',
        // },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
        },
      },
    ],
  },
}

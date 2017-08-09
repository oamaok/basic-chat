const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './client/js/index.jsx',
      './client/sass/main.sass',
    ],
  },

  output: {
    publicPath: '/',
    filename: '[name].[hash].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.scss'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body',
    }),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      __dev: true,
    }),
  ],

  devtool: 'eval-source-map',

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.s[ac]ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'], exclude: /node_modules/ },
    ],
  },
};

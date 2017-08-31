const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
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
    modules: ['node_modules', path.resolve(__dirname, 'client/js')],
    alias: {
      common: path.resolve(__dirname, 'common'),
      // Required by the react-hot-loader
      'preact-compat': 'preact-compat/dist/preact-compat',
      'react-dom': 'preact-compat',
      react: 'preact-compat',
    },
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

  devtool: 'cheap-module-eval-source-map',

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.s[ac]ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'], exclude: /node_modules/ },
    ],
  },
};

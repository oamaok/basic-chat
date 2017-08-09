const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: [
      './client/js/index.jsx',
      './client/sass/main.sass',
    ],
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build/'),
    filename: '[hash].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.scss'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body',
      inlineSource: '.(js|css)$',
    }),

    new HtmlWebpackInlineSourcePlugin(),

    new webpack.DefinePlugin({
      __dev: false,
    }),

    new ExtractTextPlugin('[contenthash].css'),
  ],

  devtool: '',

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.s[ac]ss$/,
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader'),
      },
    ],
  },
};

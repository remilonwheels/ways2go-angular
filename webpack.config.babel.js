'use strict';

const dotenv = require('dotenv');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

dotenv.load();

module.exports = () => {

  return {
    devtool: 'eval',
    entry: `${__dirname}/app/entry.js`,
    output: {
      filename: 'bundle.js',
      path: `${__dirname}/build`,
    },
    plugins: [
      new HTMLPlugin({ template: `${__dirname}/app/index.html` }),
      new ExtractTextPlugin('bundle.css'),
      new webpack.DefinePlugin({
        __API_URL__: JSON.stringify(process.env.API_URL),
        __DEBUG__: JSON.stringify(!production)
      }),
    ],
    module: {
      rules: [
        { //:::: babel ::::
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {//:::: html ::::
          test: /\.html$/,
          use: 'html-loader',
        },
        { //:::: sass ::::
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          }),
        },
        { //:::: fonts ::::
          test: /\.(ttf|eot|woff|woff2)(\?.+)?$/,
          // test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
          use: 'file-loader',
        },
        { //:::: png ::::
          test: /\.(png|svg|jpg)$/,
          use: 'file-loader',
          // use: 'file-loader?name=[name].[ext]',

        },
      ],
    },
  };
};

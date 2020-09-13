/* eslint-env node */

const extractSass = require('./extract-sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const modeDependentRules =
  process.env.NODE_ENV === 'development'
    ? []
    : [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['node_modules/muicss/lib/sass'],
              },
            },
          },
        ],
      },
    ];

module.exports = function () {
  return {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      ...modeDependentRules,
    ],
  };
};

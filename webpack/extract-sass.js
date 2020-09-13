/* eslint-env node */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = new MiniCssExtractPlugin({
  filename: '[name]-[contenthash].css',
  // disable: process.env.NODE_ENV === "development",
});

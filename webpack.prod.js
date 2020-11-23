const path = require ("path");
const common = require("./webpack.common");
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",

  output: {
    filename: "[name].[contenthash:8].bundle.js", // MD5 Hashing; ':8' limits hash to 8 characters
    path: path.resolve(__dirname, "build"),
    publicPath: ''
  },

  module: {
    rules: [
      {
        // webpack will come across the css file by importing it in the index.js
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into files
          "css-loader", // Translates CSS into valid JS ↑
          "sass-loader" // Compiles SCSS into CSS ↑
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    })
  ],
});
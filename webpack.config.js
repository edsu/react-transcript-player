const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./examples/baxley/index.html"),
    filename: "./index.html",
    inlineSource: '\.(js|css)',
});

module.exports = {
  entry: path.join(__dirname, './examples/baxley/index.js'),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader", "eslint-loader"],
        exclude: /node_modules/
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js']
  },
  devServer: {
    port: 3000,
    contentBase: './examples/baxley'
  }
};

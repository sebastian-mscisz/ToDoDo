const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/components/index.js",
  },
  output: {
    filename: "js/[name]-[contentHash:6].js",
    path: path.resolve(__dirname, "../", "build"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],

            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  devServer: {
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contentHash:6].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/templates/index.html",
    }),
  ],
};

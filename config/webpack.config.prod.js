const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // devtool: "eval-source-map",
  mode: "production",
  entry: {
    main: "./src/components/index.js",
  },
  output: {
    filename: "[name]-[contentHash:6].js",
    path: path.resolve(__dirname, "../", "build"),
    publicPath: "./",
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
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
              name: "[name].[ext]",
              outputPath: "assets/fonts",
              root: path.resolve(__dirname, "build"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]-[contentHash:6].[ext]",
            outputPath: "assets/images",
            root: path.resolve(__dirname, "build"),
          },
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]-[contentHash:6].[ext]",
            outputPath: "assets/fonts",
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[contentHash:6].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/templates/index.html",
      favicon: "src/assets/dodo.ico",
    }),
  ],
};

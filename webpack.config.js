"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
  return {
    entry: "./src/main.js",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].bundle.js",
    },
    resolve: {
      extensions: [".jsx", ".js", ".json", ".scss", ".css", ".png"],
      alias: {
        components: path.resolve(__dirname, "src/components"),
        store: path.resolve(__dirname, "src/store"),
        assets: path.resolve(__dirname, "src/assets"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["env", "stage-0", "react"],
                plugins: ["transform-decorators-legacy", "transform-runtime"],
              },
            },
          ],
        },
        {
          test: /\.js$/,
          enforce: "pre",
          loader: "eslint-loader",
        },
        {
          test: /\.(png|jpe?g|svg|mp4|mov|gif|mp3)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/[hash:base64:55].[ext]",
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: ["./node_modules"],
              },
            },
          ],
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
                mimetype: "application/font-woff",
              },
            },
          ],
        },
        {
          test: /worker\.js$/,
          use: [
            {
              loader: "worker-loader",
              options: {
                inline: true,
                name: "[name].[hash].js",
              },
            },
            {
              loader: "babel-loader",
              options: {
                presets: ["env"],
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/template.hbs",
        hash: true,
      }),
    ],

    devServer: {
      contentBase: path.join(__dirname, "src"),
      host: "0.0.0.0",
      port: 8080,
      historyApiFallback: true,
      disableHostCheck: true,
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
      },
    },
  };
};

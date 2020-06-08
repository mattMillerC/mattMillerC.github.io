const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./components/dnd-base-routing-view.js",
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new CopyWebpackPlugin(
      [
        {
          from: "img/*",
          to: ".",
          toType: "dir"
        },
        {
          from: "fonts/*",
          to: ".",
          toType: "dir"
        },
        {
          from: "data/*",
          to: ".",
          toType: "dir"
        },
        {
          from: "data/classes/*",
          to: ".",
          toType: "dir"
        },
        {
          from: "data/spells/*",
          to: ".",
          toType: "dir"
        },
        {
          from: "static/",
          to: ".",
          toType: "dir"
        },
        {
          from: "img/favicon.ico",
          to: "favicon.ico"
        },
        {
          from: path.resolve(__dirname, "node_modules/@webcomponents/webcomponentsjs/*.js"),
          to: "node_modules/@webcomponents/webcomponentsjs/[name].[ext]"
        }
      ],
      {}
    )
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};

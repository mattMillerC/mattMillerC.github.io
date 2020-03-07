const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    backgrounds: "./components/views/dnd-backgrounds-view.js",
    bestiary: "./components/views/dnd-bestiary-view.js",
    classes: "./components/views/dnd-classes-view.js",
    conditions: "./components/views/dnd-conditions-view.js",
    cults: "./components/views/dnd-cults-view.js",
    dice: "./components/views/dnd-dice-view.js",
    feats: "./components/views/dnd-feats-view.js",
    index: "./components/views/dnd-index-view.js",
    items: "./components/views/dnd-items-view.js",
    psionics: "./components/views/dnd-psionics-view.js",
    races: "./components/views/dnd-races-view.js",
    rewards: "./components/views/dnd-rewards-view.js",
    rules: "./components/views/dnd-rules-view.js",
    spells: "./components/views/dnd-spells-view.js",
    variantrules: "./components/views/dnd-variantrules-view.js"
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
          from: "static/*",
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

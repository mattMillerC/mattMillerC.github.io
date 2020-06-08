const path = require("path");

const fs = require("fs");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    https: true,
    host: '0.0.0.0',
    port: 443,
    public: 'ec2-52-12-213-157.us-west-2.compute.amazonaws.com',
    key: fs.readFileSync('/home/ubuntu/keys/dnd-webpack-dev-server/private.key'),
    cert: fs.readFileSync('/home/ubuntu/keys/dnd-webpack-dev-server/private.crt'),
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: "fake-service-worker.js",
          to: path.resolve(__dirname, "dist") + "/service-worker.js",
          toType: "file"
        }
      ],
      {}
    )
  ]
});

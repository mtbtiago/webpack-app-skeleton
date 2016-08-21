var
  path = require("path"),
  webpack = require("webpack");

const vendorModules = ["jquery", "lodash"];

const dirname = path.resolve("./");

function createConfig(isDebug) {
  const devTool = isDebug ? "eval-souce-map" : "source-map";
  const plugins = [new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js")];

  const cssLoader = {test: /\.css$/, loader: "style!css"};
  const sassLoader = {test: /\.scss$/, loader: "style!css!sass"};
  const appEntry = ["./src/client/application.js"];

  // -----------------
  // WEPACK CONFIG
  return {
    devtool: devTool,
    entry: {
      application: appEntry,
      vendor: vendorModules
    },
    output: {
      path: path.join(dirname, "public", "build"),
      filename: "[name].js", // special webpack syntax
      publicPath: "/build/"
    },
    resolve: {
      alias: {
        shared: path.join(dirname, "src", "shared")
      }
    },
    module: {
      loaders: [
        {test: /\.js$/, loader: "babel", exclude: /node_modules/},
        {test: /\.js$/, loader: "eslint", exclude: /node_modules/},
        {test: /\.(png|jpg|jpeg|gir|woff|ttf|eot|svr|woff)$/, loader: "url-loader?limit=512"},
        cssLoader,
        sassLoader
      ]
    }

  };
  // -----------------
}

module.exports = createConfig(true);
module.exports.create = createConfig;

var webpack = require('webpack');
var webpackMerge = require("webpack-merge");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var commonConfig = require("./webpack.common.js");
var helpers = require("./helpers");

module.exports = webpackMerge(commonConfig, {
    devtool: "cheap-module-eval-source-map",

    output: {
        path: helpers.root("dist"),
        publicPath: "http://localhost:3000/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.DefinePlugin({
          "process.env.DEV_ENV" : JSON.stringify(true),
        })
    ],

    devServer: {
        historyApiFallback: true,
        stats: "minimal",
        proxy: {
          "/api/**": {
            target: "http://admin:admin@localhost:4000",
            pathRewrite: (req, options) => {
              let endpoint = options.query.endpoint;
              
              if (options.method == "GET") {
                if(req.match(/\/generate_tabs/)) {
                  if(options.query.year) {
                    return `/v1/Distinct/${options.query.year}/${endpoint}`;
                  } else {
                    return `/v1/Distinct/${endpoint}`;
                  }
                }
                if(req.match(/\/photos/)) {
                  return `/v1/Search/Photos?doAnd=${options.query.doAnd}&year=${options.query.year}&month=${options.query.month}&page=${options.query.page}`;
                }
                if(req.match(/\/videos/)) {
                  return `/v1/Search/Videos?doAnd=${options.query.doAnd}&year=${options.query.year}&month=${options.query.month}&page=${options.query.page}`;
                }
              }
              
            }
          }
        }
    }
});
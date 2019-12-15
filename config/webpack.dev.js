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
              req = req.replace(/\/api/, '/v1');
              let splitReq = req.split('/');
              
              if(req.match(/\/generate_tabs/)) {  
                return req.replace(/\/generate_tabs/, '/Distinct');
              } 
              
              if(splitReq[2].length >= 24 ) {
                let partial = '';
                if(options.method == 'GET') { partial = `SearchById` }
                if(options.method == 'POST') { partial = `UpdateById` }
                if(options.method == 'DELETE') { partial = `RemoveById` }
                return req.replace(/\/v1/, `/v1/${partial}`);
              }
              
              else {
                return req;
              }
              
            }
          }
        }
    }
});